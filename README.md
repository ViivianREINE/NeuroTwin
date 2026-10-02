# NeuroTwinDX - Your Future Brain. Predicted Today.

NeuroTwinDX is an AI-powered Predictive Brain Digital Twin platform. It integrates clinical risk prediction (XGBoost), anatomical MRI classification (ResNet18-like deep residual network), SHAP-based Explainable AI, interactive lifestyle workshops, and multi-domain cognitive wellness assessments. It delivers actionable, medical-grade diagnostic insights and compiles a professional-grade PDF diagnostic dossier for clinical review.

---

## Technical Stack & Architecture

### 1. Frontend
* **Framework**: Next.js 15 (App Router, Client-side Hydration)
* **Styling**: TailwindCSS (Glassmorphic dark theme, custom responsive elements, neon accents)
* **Visualizations**: Recharts (Dynamic Area charts, horizontal Bar impact factors, multi-axis Radar maps)
* **State Management**: React State with API context synchronization

### 2. Backend
* **Framework**: FastAPI (Python 3.12, Uvicorn ASGI server)
* **Clinical Intelligence**: XGBoost Classifier (feature space scaling, SHAP tree explainers)
* **Morphological Analysis**: Custom Residual Deep CNN (ResNet18 structure in PyTorch, custom hook-based Grad-CAM attention visualizer)
* **Reporting**: ReportLab (Vector graphic grids, styled paragraph paragraphs, auto-download bytes formatting)

### 3. Database
* **Engine**: PostgreSQL 15
* **ORM**: SQLAlchemy (Declarative Base schema mapper, session connection pooling with startup backoffs)

### 4. Containerization
* **Orchestration**: Docker & Docker Compose (healthchecked database dependencies, automatic model compilers)

---

## Folder Structure

```text
NeuroTwinDX/
├── docker-compose.yml           # Unified multi-container orchestration config
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── routes.py            # API endpoint router (risk, MRI, explanation, PDF, wellness)
│   │   ├── schemas.py           # Pydantic data validation schemas
│   │   ├── auth.py              # JWT authentication handlers
│   │   ├── database.py          # SQLAlchemy PostgreSQL connection manager
│   │   └── models.py            # SQLAlchemy database entity models
│   ├── training/
│   │   ├── clinical/
│   │   │   └── train_clinical.py# XGBoost clinical risk compiler (synthetic data fallback)
│   │   └── mri/
│   │       └── train_mri.py     # Custom PyTorch CNN compiler (synthetic data fallback)
│   ├── models/                  # Holds compiled clinical_model.pkl & mri_model.pth
│   ├── Dockerfile               # Backend container specification
│   └── requirements.txt         # Python package list
├── frontend/
│   ├── app/
│   │   ├── layout.tsx           # Global Next.js page layout config
│   │   ├── globals.css          # Tailwind imports, neon text, and scrollbars
│   │   └── page.tsx             # Interactive, multi-tab glassmorphic user dashboard
│   ├── package.json             # Frontend Node configuration
│   ├── postcss.config.js        # PostCSS utility config
│   ├── tailwind.config.js       # Custom themes and glowing shadow configurations
│   ├── next.config.js           # Next.js build-time lint filter overrides
│   └── Dockerfile               # Next.js production server container specification
└── database/
    └── init.sql                 # Seeding schemas and active mock users
```

---

## Dynamic Setup & Verification

NeuroTwinDX is designed to run completely **out-of-the-box**. On container startup:
1. The Postgres database engine spins up and runs `database/init.sql` to construct the schemas.
2. The FastAPI backend container polls until Postgres reports healthy status.
3. The backend dynamically verifies model weights (`models/clinical_model.pkl` & `models/mri_model.pth`). If missing, it programmatically runs the training pipelines to generate them.
4. Once compiled, FastAPI mounts the active routers and Next.js compiles the web frontend interface.

### Deployment Instruction

From the root directory, launch the entire application with one command:

```bash
docker compose up --build
```

---

## API Endpoints List

* **POST `/api/predict-risk`**: Computes clinical dementia risk from Age, BMI, Smoking, Sleep, Physical Activity, Alcohol, Confusion, and Memory Complaints.
* **POST `/api/upload-mri`**: Feeds uploaded T2 scan into PyTorch CNN. Returns classification and custom base64 Grad-CAM heatmap.
* **POST `/api/simulate`**: Modifies habits to compare current risk versus future risk, outputting the exact delta improvement.
* **POST `/api/explain`**: Computes local SHAP waterfall indicators and global feature importance.
* **POST `/api/assessment`**: Scores the 35 cognitive wellness answers across 7 domains to return overall index and Radar Chart coordinates.
* **POST `/api/generate-report`**: Compiles assessment outputs into an aligned professional PDF report using ReportLab.
* **GET `/api/dashboard`**: Aggregates twin metrics, Brain Age, and history charts.
* **GET `/api/user`**: Retrieves user authentication profile.
