from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, TIMESTAMP, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    assessments = relationship("Assessment", back_populates="user", cascade="all, delete-orphan")
    mris = relationship("MRIUpload", back_populates="user", cascade="all, delete-orphan")
    simulations = relationship("Simulation", back_populates="user", cascade="all, delete-orphan")
    digital_twins = relationship("DigitalTwin", back_populates="user", cascade="all, delete-orphan")
    wellness = relationship("BrainWellness", back_populates="user", cascade="all, delete-orphan")


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    age = Column(Integer, nullable=False)
    bmi = Column(Float, nullable=False)
    smoking = Column(Boolean, nullable=False)
    alcohol = Column(Float, nullable=False)
    sleep = Column(Float, nullable=False)
    physical_activity = Column(Float, nullable=False)
    memory_complaints = Column(Boolean, nullable=False)
    confusion = Column(Boolean, nullable=False)
    clinical_risk = Column(Float, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="assessments")


class MRIUpload(Base):
    __tablename__ = "mri_uploads"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    image_base64 = Column(String, nullable=False)
    prediction = Column(String(50), nullable=False)
    confidence = Column(Float, nullable=False)
    heatmap_base64 = Column(String, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="mris")


class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    scenario = Column(JSON, nullable=False)
    future_risk = Column(Float, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="simulations")


class DigitalTwin(Base):
    __tablename__ = "digital_twins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    clinical_risk = Column(Float, nullable=False)
    mri_risk = Column(Float, nullable=False)
    lifestyle_score = Column(Float, nullable=False)
    thi = Column(Float, nullable=False)  # Twin Health Index
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="digital_twins")


class BrainWellness(Base):
    __tablename__ = "brain_wellness"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    overall_score = Column(Float, nullable=False)
    memory_score = Column(Float, nullable=False)
    attention_score = Column(Float, nullable=False)
    executive_score = Column(Float, nullable=False)
    sleep_score = Column(Float, nullable=False)
    lifestyle_score = Column(Float, nullable=False)
    social_score = Column(Float, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="wellness")
