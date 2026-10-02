from pydantic import BaseModel, Field, EmailStr
from typing import List, Dict, Any, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Clinical Risk & Prediction Schemas
class RiskPredictionRequest(BaseModel):
    age: int = Field(..., ge=18, le=120)
    bmi: float = Field(..., ge=10, le=60)
    smoking: bool
    alcohol: float = Field(..., ge=0, le=100) # units/week
    sleep: float = Field(..., ge=0, le=24) # hours/day
    physical_activity: float = Field(..., ge=0, le=168) # hours/week
    memory_complaints: bool
    confusion: bool

class RiskPredictionResponse(BaseModel):
    risk: float = Field(..., description="Alzheimer's Risk percentage 0-100")
    confidence: float = Field(..., description="Prediction confidence percentage 0-100")

# Explainable AI Schemas
class FeatureContribution(BaseModel):
    feature: str
    value: float
    effect: float # positive means increases risk, negative means decreases

class ExplainResponse(BaseModel):
    base_value: float
    prediction_value: float
    contributions: List[FeatureContribution]
    feature_importance: Dict[str, float]

# Simulation Schemas
class SimulationRequest(BaseModel):
    current_data: RiskPredictionRequest
    modified_data: RiskPredictionRequest

class SimulationResponse(BaseModel):
    current_risk: float
    future_risk: float
    improvement: float # Improvement percentage (current - future)

# MRI Upload Schemas
class MRIUploadRequest(BaseModel):
    image_base64: str = Field(..., description="Base64 encoded MRI image")

class MRIUploadResponse(BaseModel):
    predicted_class: str = Field(..., description="Classification category")
    confidence: float = Field(..., description="Confidence percentage")
    heatmap_base64: str = Field(..., description="Base64 encoded Grad-CAM heatmap overlay")

# Brain Wellness Assessment Schemas
class BrainWellnessRequest(BaseModel):
    answers: List[str] = Field(..., max_items=35, min_items=35, description="35 answers (A, B, C, D, or E)")

class BrainWellnessResponse(BaseModel):
    overall_score: float
    memory_score: float
    attention_score: float
    executive_score: float
    sleep_score: float
    lifestyle_score: float
    social_score: float
    radar_data: List[Dict[str, Any]]

# Dashboard Summary Schemas
class DashboardResponse(BaseModel):
    current_risk: float
    twin_health_index: float
    brain_age: int
    mri_classification: str
    mri_confidence: float
    radar_wellness_data: List[Dict[str, Any]]
    historical_risks: List[Dict[str, Any]]
    feature_importance: List[Dict[str, Any]]
