<div align="center">

# 🧠 NeuroTwinDX

### **Your Future Brain. Predicted Today.**

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3B241C,20:7E574D,40:D8A7A0,60:C98F8F,80:F3D9A5,100:F8F1E7&height=220&section=header&text=NEUROTWIN%20DX&fontSize=42&fontColor=FFF9F3&animation=fadeIn&fontAlignY=58"/>

<br/>

### **Predictive Neurotechnology • Explainable AI • Brain Intelligence**

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_15-3B241C?style=for-the-badge&logo=next.js&logoColor=F8F1E7)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-D8A7A0?style=for-the-badge&logo=fastapi&logoColor=3B241C)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-F3D9A5?style=for-the-badge&logo=pytorch&logoColor=3B241C)](https://pytorch.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-E8D8C8?style=for-the-badge&logo=postgresql&logoColor=3B241C)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-F8F1E7?style=for-the-badge&logo=docker&logoColor=3B241C)](https://www.docker.com/)

<br/>

**An AI-powered predictive brain digital twin designed to connect clinical risk,  
MRI intelligence, explainability, cognitive wellness, and longitudinal insight.**

</div>

---

## 𓂃 THE IDEA

> **What if brain health could be explored as a living digital model —  
> one that learns from clinical signals, imaging, behavior, and cognition?**

**NeuroTwinDX** is a predictive brain digital-twin platform that brings multiple intelligence layers into a single system.

It combines:

`Clinical Risk Prediction`  
`MRI Analysis`  
`Explainable AI`  
`Cognitive Wellness`  
`Lifestyle Simulation`  
`Brain Metrics`  
`Professional Reporting`

The platform is designed around a simple principle:

### **Understand the brain. Explain the signal. Explore the future.**

---

## ✦ WHAT NEUROTWIN DOES

```text
                 ┌─────────────────────┐
                 │      USER DATA       │
                 │ Clinical + Lifestyle │
                 │      + Cognitive     │
                 └──────────┬──────────┘
                            │
                            ▼
               ┌────────────────────────┐
               │   NEUROTWIN ENGINE     │
               └────────────┬───────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
      ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
      │ Clinical AI │ │  MRI Vision │ │ Cognitive   │
      │  XGBoost    │ │ PyTorch CNN │ │ Assessment  │
      └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
             │               │               │
             └───────────────┼───────────────┘
                             ▼
                    ┌─────────────────┐
                    │ Explainability  │
                    │     + SHAP      │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │ Brain Twin &    │
                    │ Future Scenarios│
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │ Clinical-style  │
                    │ PDF Intelligence│
                    └─────────────────┘
````

---

# 𓆩 INTELLIGENCE LAYERS

## 01 — Clinical Risk Intelligence

NeuroTwinDX uses an **XGBoost-based clinical prediction pipeline** to estimate dementia-related risk from structured inputs including:

* Age
* BMI
* Smoking
* Sleep
* Physical activity
* Alcohol
* Confusion indicators
* Memory complaints

The prediction layer is paired with **SHAP-based explainability** so that model outputs are accompanied by feature-level contribution signals rather than appearing as a completely opaque score.

---

## 02 — MRI Intelligence

Uploaded T2 MRI data can be processed through a **PyTorch residual convolutional architecture** inspired by the ResNet18 structure.

The imaging pipeline includes:

```text
MRI Input
   ↓
Preprocessing
   ↓
Residual CNN
   ↓
Classification
   ↓
Grad-CAM Attention
   ↓
Visual Interpretation
```

The platform can generate a **base64-encoded Grad-CAM visualization** to expose the regions receiving attention from the model.

---

## 03 — Explainable AI

### Prediction should not end with a number.

NeuroTwinDX integrates **SHAP TreeExplainers** to provide:

```text
Prediction
     ↓
Feature Contributions
     ↓
Positive / Negative Influence
     ↓
Local Explanation
     ↓
Global Feature Importance
```

This creates an interpretable bridge between model output and the underlying clinical features.

---

## 04 — Cognitive Wellness Intelligence

The platform includes a **35-question cognitive wellness assessment** organized across **7 domains**.

The resulting information is transformed into:

`Overall Index`
`Domain-level signals`
`Radar visualization`
`Wellness interpretation`

The assessment layer allows the digital twin to represent more than a single prediction by incorporating broader cognitive-wellness dimensions.

---

## 05 — Lifestyle Simulation

NeuroTwinDX includes a simulation workflow designed to compare:

```text
CURRENT STATE
      │
      ▼
Lifestyle Modification
      │
      ▼
SIMULATED FUTURE STATE
      │
      ▼
Risk Difference
```

The `/api/simulate` endpoint modifies lifestyle variables and returns the resulting change between the current and simulated risk states.

---

## 06 — Intelligence Reports

The system can transform the generated outputs into a professionally structured **PDF diagnostic dossier** using ReportLab.

```text
Assessment
    +
Clinical Prediction
    +
MRI Intelligence
    +
Explainability
    +
Wellness Metrics
    ↓
Professional PDF Report
```

---

# ✧ ARCHITECTURE

```text
                    ┌───────────────────────┐
                    │      NEXT.JS 15       │
                    │     User Dashboard    │
                    │                       │
                    │  Charts • Forms • UI  │
                    └───────────┬───────────┘
                                │
                                │ REST API
                                ▼
                    ┌───────────────────────┐
                    │       FASTAPI         │
                    │    AI Orchestration   │
                    └───────────┬───────────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
      ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
      │   XGBoost   │    │   PyTorch   │    │    SHAP     │
      │ Clinical AI │    │  MRI Vision │    │ Explainable │
      └─────────────┘    └─────────────┘    └─────────────┘
             │                  │                  │
             └──────────────────┼──────────────────┘
                                ▼
                    ┌───────────────────────┐
                    │     PostgreSQL 15     │
                    │   SQLAlchemy ORM      │
                    └───────────────────────┘

                    Docker + Compose
                    ─────────────────
                    Full-stack orchestration
```

---

# 𓂃 TECHNICAL STACK

## Frontend

| Technology       | Role                           |
| ---------------- | ------------------------------ |
| **Next.js 15**   | Application framework          |
| **React 18**     | UI layer                       |
| **TypeScript**   | Typed frontend development     |
| **TailwindCSS**  | Styling system                 |
| **Recharts**     | Interactive data visualization |
| **Zustand**      | Client state management        |
| **Lucide React** | Interface iconography          |

## Backend

| Technology      | Role                 |
| --------------- | -------------------- |
| **FastAPI**     | API framework        |
| **Python 3.12** | Backend runtime      |
| **Uvicorn**     | ASGI server          |
| **Pydantic**    | Validation & schemas |
| **SQLAlchemy**  | ORM & database layer |

## AI / ML

| Technology       | Role                         |
| ---------------- | ---------------------------- |
| **XGBoost**      | Clinical risk prediction     |
| **PyTorch**      | MRI deep-learning inference  |
| **SHAP**         | Explainable AI               |
| **Grad-CAM**     | Visual model attention       |
| **scikit-learn** | ML utilities & preprocessing |

## Data & Infrastructure

| Technology         | Role                        |
| ------------------ | --------------------------- |
| **PostgreSQL 15**  | Persistent data layer       |
| **Docker**         | Containerization            |
| **Docker Compose** | Multi-service orchestration |
| **ReportLab**      | PDF report generation       |

---

# ✦ API SURFACE

| Endpoint                    | Function                             |
| --------------------------- | ------------------------------------ |
| `POST /api/predict-risk`    | Clinical dementia-risk prediction    |
| `POST /api/upload-mri`      | MRI classification + Grad-CAM        |
| `POST /api/simulate`        | Lifestyle scenario simulation        |
| `POST /api/explain`         | SHAP local/global explanations       |
| `POST /api/assessment`      | 35-question cognitive assessment     |
| `POST /api/generate-report` | Professional PDF report              |
| `GET /api/dashboard`        | Brain metrics + historical dashboard |
| `GET /api/user`             | User profile information             |

---

# 𓆩 PROJECT STRUCTURE

```text
NeuroTwinDX/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   ├── database.py
│   │   └── models.py
│   │
│   ├── training/
│   │   ├── clinical/
│   │   │   └── train_clinical.py
│   │   │
│   │   └── mri/
│   │       └── train_mri.py
│   │
│   ├── models/
│   │   ├── clinical_model.pkl
│   │   └── mri_model.pth
│   │
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── page.tsx
│   │
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── Dockerfile
│
├── database/
│   └── init.sql
│
├── docker-compose.yml
└── README.md
```

---

# ✧ RUN LOCALLY

### Clone

```bash
git clone https://github.com/ViivianREINE/NeuroTwin.git
cd NeuroTwin
```

### Launch the complete stack

```bash
docker compose up --build
```

Docker Compose orchestrates the application services, including PostgreSQL, the FastAPI backend, and the Next.js frontend.

---

# 𓂃 SYSTEM FLOW

```text
                 ┌───────────────┐
                 │ User Inputs   │
                 └───────┬───────┘
                         ↓
              ┌─────────────────────┐
              │ Clinical + Lifestyle│
              └──────────┬──────────┘
                         ↓
                   ┌───────────┐
                   │ XGBoost   │
                   └─────┬─────┘
                         ↓
                  Clinical Risk
                         │
                         ├──────────────┐
                         │              │
                         ▼              ▼
                      SHAP          Lifestyle
                   Explanation      Simulation
                                        │
MRI ───────────────→ PyTorch ──────────┘
                         │
                         ▼
                     Grad-CAM
                         │
                         ▼
              ┌────────────────────┐
              │ Cognitive Wellness │
              │    Assessment      │
              └─────────┬──────────┘
                        ↓
                 Brain Twin View
                        ↓
                Professional Report
```

---

# ✦ DESIGN SYSTEM

NeuroTwinDX intentionally moves away from the conventional **dark neon medical-AI dashboard** aesthetic.

Its visual identity is inspired by:

**quiet luxury × editorial science × modern neurotechnology**

### Palette

| Tone             | Hex       |
| ---------------- | --------- |
| 🌹 Rose Gold     | `#D8A7A0` |
| 🎀 Dusty Pink    | `#C98F8F` |
| 🧈 Butter Yellow | `#F3D9A5` |
| 🥐 Warm Beige    | `#E8D8C8` |
| 🤍 Ivory         | `#F8F1E7` |
| ☕ Mocha Brown    | `#3B241C` |

### Visual language

```text
Editorial Typography
        +
Soft Neutrals
        +
Glass Surfaces
        +
Subtle Motion
        +
Scientific Data
        +
Quiet Luxury
```

---

# 𓆩 WHY IT MATTERS

NeuroTwinDX explores how several traditionally separate pieces of health intelligence can coexist inside one digital environment.

Instead of treating:

**clinical data**

**medical imaging**

**explainability**

**cognitive assessment**

**lifestyle behavior**

as isolated components, the platform brings them together into a single predictive experience.

The result is a prototype architecture for thinking about **brain health as a multi-dimensional digital representation** rather than a single isolated prediction.

---

# ✧ RESPONSIBLE USE

NeuroTwinDX is a **research / prototype platform** and is not a substitute for professional medical diagnosis, treatment, or clinical decision-making.

Model predictions, MRI classifications, wellness scores, and generated reports should be interpreted as outputs of an experimental AI system and reviewed appropriately before any real-world clinical use.

---

# 𓂃 DESIGN PHILOSOPHY

> **Intelligence should be understandable.
> Complexity should feel calm.
> Technology should remain human.**

NeuroTwinDX is built around the idea that sophisticated AI systems do not need to feel intimidating.

The interface should make complex intelligence feel:

**clear · calm · interpretable · intentional**

---

# ✦ THE VISION

```text
             INPUT
               ↓
        Understand Signals
               ↓
          Build the Twin
               ↓
       Explain the Model
               ↓
        Explore Scenarios
               ↓
        Understand Change
               ↓
          Better Insight
```

### **Predict the signal.**

### **Understand the pattern.**

### **Explore the possibility.**

---

# 𓆩 AUTHOR

<div align="center">

## **Priyam Parashar**

AI • Technology • Research • Engineering

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-3B241C?style=for-the-badge\&logo=github\&logoColor=F8F1E7)](https://github.com/ViivianREINE)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-D8A7A0?style=for-the-badge\&logo=linkedin\&logoColor=3B241C)](https://www.linkedin.com/in/priyam-parashar-5b0b67273/)

<br/>

**𓂃 Building intelligent systems, beautifully.**

</div>

---

<div align="center">

### 🧠 NeuroTwinDX

*Predictive intelligence for the future of brain health.*

<br/>

`✦ NEUROTECHNOLOGY • EXPLAINABLE AI • DIGITAL TWINS ✦`

</div>
```

