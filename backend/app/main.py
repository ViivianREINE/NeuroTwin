from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import router

# Automatically generate database tables if they do not exist
try:
    print("Verifying database schema models...")
    Base.metadata.create_all(bind=engine)
    print("Database tables initialized successfully.")
except Exception as e:
    print(f"Error during startup database creation: {e}")

# Instantiate FastAPI application
app = FastAPI(
    title="NeuroTwinDX API",
    description="Your Future Brain. Predicted Today. Predictive Cognitive Digital Twin Engine.",
    version="1.0.0"
)

# Enable CORS for the frontend next.js container
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Wire up the API Router
app.include_router(router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "NeuroTwinDX API Engine",
        "tagline": "Your Future Brain. Predicted Today."
    }
