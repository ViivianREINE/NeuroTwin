FROM python:3.12-slim

# Prevent python from writing pyc files and buffering stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies required for compilation, PostgreSQL drivers, and image filters
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code into working directory
COPY . .

# Run clinical and MRI model training scripts to generate pkl and pth weights instantly on build,
# then launch the FastAPI server via Uvicorn
CMD python -m training.clinical.train_clinical && \
    python -m training.mri.train_mri && \
    uvicorn app.main:app --host 0.0.0.0 --port 8000
