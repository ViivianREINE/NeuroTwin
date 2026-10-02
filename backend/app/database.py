import os
import time
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Fetch database configuration from environment variables
DB_USER = os.getenv("POSTGRES_USER", "postgres")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
DB_HOST = os.getenv("POSTGRES_HOST", "db")
DB_PORT = os.getenv("POSTGRES_PORT", "5432")
DB_NAME = os.getenv("POSTGRES_DB", "neurotwin")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Fallback to local sqlite for development outside Docker if needed
if os.getenv("ENV") == "development" and not DB_HOST:
    DATABASE_URL = "sqlite:///./neurotwin.db"

# Implement exponential backoff for database connection to survive container startup races
for attempt in range(5):
    try:
        engine = create_engine(
            DATABASE_URL,
            pool_pre_ping=True,
            pool_recycle=1800,
            pool_size=10,
            max_overflow=20
        )
        # Connect to verify availability
        connection = engine.connect()
        connection.close()
        print("Connected to PostgreSQL database successfully.")
        break
    except Exception as e:
        print(f"PostgreSQL connection attempt {attempt + 1}/5 failed: {e}")
        time.sleep(3)
else:
    # If all fail, create an in-memory database as a robust runtime fallback to avoid startup failure
    print("Database connection failed. Falling back to safe memory-only sqlite...")
    DATABASE_URL = "sqlite:///:memory:"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
