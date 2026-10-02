import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
from PIL import Image, ImageDraw

# Create synthetic 2D MRI Brain Scans representing 4 stages of Dementia
# Non Demented (0), Very Mild (1), Mild (2), Moderate Demented (3)
def create_synthetic_brain_slice(dementia_level, size=(128, 128)):
    # 0: Non Demented, 1: Very Mild, 2: Mild, 3: Moderate
    img = Image.new('L', size, 0)
    draw = ImageDraw.Draw(img)
    
    # Outer skull boundary
    draw.ellipse([10, 10, 118, 118], fill=40)
    
    # Brain tissue (cerebrum) - shrink size as dementia increases (atrophy)
    tissue_shrink = dementia_level * 3
    draw.ellipse([15 + tissue_shrink, 15 + tissue_shrink, 113 - tissue_shrink, 113 - tissue_shrink], fill=180)
    
    # Ventricles (central fluid-filled spaces) - enlarge as dementia increases
    ventricle_expand = dementia_level * 5
    v_left = 64 - 5 - ventricle_expand
    v_right = 64 + 5 + ventricle_expand
    
    # Left ventricle
    draw.ellipse([v_left, 50, 62, 78], fill=20)
    # Right ventricle
    draw.ellipse([66, 50, v_right, 78], fill=20)
    
    # Add minor noise to simulate MRI texture
    arr = np.array(img, dtype=np.float32)
    noise = np.random.normal(0, 8, size)
    arr = np.clip(arr + noise, 0, 255) / 255.0
    
    # Ensure 3-channels for transfer learning models (RGB)
    rgb_arr = np.stack([arr, arr, arr], axis=0)  # Shape: (3, H, W)
    return rgb_arr

class MRIDataset(Dataset):
    def __init__(self, num_samples_per_class=150):
        self.data = []
        self.labels = []
        
        for label in range(4):
            for _ in range(num_samples_per_class):
                slice_data = create_synthetic_brain_slice(label)
                self.data.append(slice_data)
                self.labels.append(label)
                
        self.data = np.array(self.data, dtype=np.float32)
        self.labels = np.array(self.labels, dtype=np.int64)
        
    def __len__(self):
        return len(self.labels)
        
    def __getitem__(self, idx):
        return torch.tensor(self.data[idx]), torch.tensor(self.labels[idx])

# Highly efficient residual network mimicking ResNet18
class ResidualBlock(nn.Module):
    def __init__(self, channels):
        super(ResidualBlock, self).__init__()
        self.conv1 = nn.Conv2d(channels, channels, kernel_size=3, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(channels)
        self.relu = nn.ReLU(inplace=True)
        self.conv2 = nn.Conv2d(channels, channels, kernel_size=3, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(channels)

    def forward(self, x):
        residual = x
        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)
        out = self.conv2(out)
        out = self.bn2(out)
        out += residual
        out = self.relu(out)
        return out

class CustomBrainResNet(nn.Module):
    def __init__(self, num_classes=4):
        super(CustomBrainResNet, self).__init__()
        # Initial projection
        self.prep = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2)  # 32 x 64 x 64
        )
        
        # Block 1
        self.layer1 = nn.Sequential(
            nn.Conv2d(32, 64, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),  # 64 x 32 x 32
            ResidualBlock(64)
        )
        
        # Block 2
        self.layer2 = nn.Sequential(
            nn.Conv2d(64, 128, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),  # 128 x 16 x 16
            ResidualBlock(128)
        )
        
        # Final layers
        self.pool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(128, num_classes)
        
    def forward(self, x):
        x = self.prep(x)
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.pool(x)
        x = x.view(x.size(0), -1)
        x = self.fc(x)
        return x

def train_mri_model():
    print("Initializing MRI Classification training...")
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using compute device: {device}")
    
    # Generate datasets
    train_dataset = MRIDataset(num_samples_per_class=120)
    val_dataset = MRIDataset(num_samples_per_class=30)
    
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
    
    model = CustomBrainResNet(num_classes=4).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    epochs = 8
    print(f"Beginning training loop across {epochs} epochs...")
    
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0
        
        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item() * images.size(0)
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()
            
        epoch_loss = running_loss / len(train_loader.dataset)
        epoch_acc = (correct / total) * 100
        
        # Validation pass
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                
                val_loss += loss.item() * images.size(0)
                _, predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels).sum().item()
                
        val_epoch_loss = val_loss / len(val_loader.dataset)
        val_epoch_acc = (val_correct / val_total) * 100
        
        print(f"Epoch {epoch+1}/{epochs}: "
              f"Train Loss: {epoch_loss:.4f} | Train Acc: {epoch_acc:.2f}% | "
              f"Val Loss: {val_epoch_loss:.4f} | Val Acc: {val_epoch_acc:.2f}%")
              
    # Save model weights
    os.makedirs('models', exist_ok=True)
    model_path = 'models/mri_model.pth'
    torch.save(model.state_dict(), model_path)
    print(f"MRI Classifier model weights successfully saved to {model_path}.")

if __name__ == '__main__':
    train_mri_model()
