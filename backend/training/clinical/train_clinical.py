import os
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from xgboost import XGBClassifier

def generate_synthetic_data(num_samples=2000):
    np.random.seed(42)
    # Generate realistic ranges based on Kaggle Alzheimer's dataset
    age = np.random.uniform(50, 90, num_samples)
    bmi = np.random.uniform(18.5, 35.0, num_samples)
    smoking = np.random.choice([0, 1], size=num_samples, p=[0.7, 0.3])
    alcohol = np.random.uniform(0, 20, num_samples)  # units/week
    sleep = np.random.uniform(4, 9, num_samples)
    physical_activity = np.random.uniform(0, 10, num_samples)  # hrs/week
    memory_complaints = np.random.choice([0, 1], size=num_samples, p=[0.75, 0.25])
    confusion = np.random.choice([0, 1], size=num_samples, p=[0.8, 0.2])

    # Calculate logit risk score
    # High age, high BMI, smoking, alcohol, memory complaints, confusion increase risk
    # High sleep, physical activity decrease risk
    risk_score = (
        0.08 * (age - 65) +
        0.05 * (bmi - 25) +
        0.6 * smoking +
        0.03 * alcohol -
        0.15 * (sleep - 7) -
        0.08 * physical_activity +
        1.5 * memory_complaints +
        1.2 * confusion -
        2.0  # intercept
    )
    
    probability = 1 / (1 + np.exp(-risk_score))
    diagnosis = (probability > np.random.uniform(0, 1, num_samples)).astype(int)

    df = pd.DataFrame({
        'Age': age,
        'BMI': bmi,
        'Smoking': smoking,
        'Alcohol': alcohol,
        'Sleep': sleep,
        'PhysicalActivity': physical_activity,
        'MemoryComplaints': memory_complaints,
        'Confusion': confusion,
        'Diagnosis': diagnosis
    })
    return df

def train_clinical_model():
    print("Initializing Clinical Risk Prediction training...")
    
    # Define features and target
    feature_cols = ['Age', 'BMI', 'Smoking', 'Alcohol', 'Sleep', 'PhysicalActivity', 'MemoryComplaints', 'Confusion']
    
    # Generate data
    df = generate_synthetic_data()
    
    X = df[feature_cols]
    y = df['Diagnosis']
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train XGBoost
    print("Training XGBoost Classifier...")
    model = XGBClassifier(
        n_estimators=100,
        max_depth=5,
        learning_rate=0.05,
        random_state=42,
        eval_metric='logloss'
    )
    model.fit(X_train_scaled, y_train)
    
    # Predict and evaluate
    y_pred = model.predict(X_test_scaled)
    y_prob = model.predict_proba(X_test_scaled)[:, 1]
    
    metrics = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred),
        'recall': recall_score(y_test, y_pred),
        'f1': f1_score(y_test, y_pred),
        'roc_auc': roc_auc_score(y_test, y_prob)
    }
    
    print("\nClinical Model Training Metrics:")
    for metric_name, val in metrics.items():
        print(f" - {metric_name.upper()}: {val:.4f}")
        
    # Save model and artifacts
    os.makedirs('models', exist_ok=True)
    model_path = 'models/clinical_model.pkl'
    
    with open(model_path, 'wb') as f:
        pickle.dump({
            'model': model,
            'scaler': scaler,
            'features': feature_cols,
            'metrics': metrics
        }, f)
        
    print(f"\nModel and scaler successfully saved to {model_path}.")

if __name__ == '__main__':
    train_clinical_model()
