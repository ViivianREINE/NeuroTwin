-- Initialize schema for NeuroTwinDX Database
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    age INTEGER NOT NULL,
    bmi REAL NOT NULL,
    smoking BOOLEAN NOT NULL,
    alcohol REAL NOT NULL,
    sleep REAL NOT NULL,
    physical_activity REAL NOT NULL,
    memory_complaints BOOLEAN NOT NULL,
    confusion BOOLEAN NOT NULL,
    clinical_risk REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mri_uploads (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    image_base64 TEXT NOT NULL,
    prediction VARCHAR(50) NOT NULL,
    confidence REAL NOT NULL,
    heatmap_base64 TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS simulations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    scenario JSONB NOT NULL, -- Holds Sleep, Exercise, Smoking, Alcohol, BMI values
    future_risk REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS digital_twins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    clinical_risk REAL NOT NULL,
    mri_risk REAL NOT NULL,
    lifestyle_score REAL NOT NULL,
    thi REAL NOT NULL, -- Twin Health Index
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS brain_wellness (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    overall_score REAL NOT NULL,
    memory_score REAL NOT NULL,
    attention_score REAL NOT NULL,
    executive_score REAL NOT NULL,
    sleep_score REAL NOT NULL,
    lifestyle_score REAL NOT NULL,
    social_score REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial records for demonstration
INSERT INTO users (name, email) VALUES 
('Alex Mercer', 'alex.mercer@neurotwin.org')
ON CONFLICT (email) DO NOTHING;
