## Car Price Prediction – Production-Ready ML App

This project started as a school assignment and has been refactored into a **production-style, portfolio-ready machine learning application** for predicting used car prices (Tunisian market).

The repository now contains:
- **Reproducible ML pipeline** (data loading, preprocessing, training, evaluation, persistence)
- **FastAPI backend** exposing a `/predict` endpoint
- **Streamlit UI** to interactively estimate car prices
- Clear **project structure**, **type hints**, and **documentation**

### 1. Tech stack

- **Language**: Python 3.10+
- **ML**: `scikit-learn`, `pandas`, `numpy`
- **API**: `FastAPI`, `uvicorn`
- **Frontend**: `Streamlit`
- **Serialization**: `joblib`

### 2. Project structure

```text
.
├── api/
│   └── main.py                # FastAPI app (health + /predict)
├── models/
│   └── car_price_model.joblib # Saved sklearn Pipeline (created after training)
├── src/
│   └── car_price_model/
│       ├── __init__.py
│       ├── config.py          # Paths, feature lists, random seed
│       ├── data.py            # Data loading + train/val split
│       ├── features.py        # Preprocessing & feature engineering pipeline
│       ├── model.py           # Model build, train, evaluate, save/load, predict
│       └── schemas.py         # Pydantic models shared with FastAPI
├── streamlit_app.py           # Simple UI for human interaction
├── train.py                   # CLI script to train & evaluate the model
├── requirements.txt           # Python dependencies
├── Clean.ipynb                # (Original cleaning notebook)
├── DataVis.ipynb              # (Original EDA notebook)
├── Model.ipynb                # (Original modeling notebook)
└── Car-Data-Occasion-Clean-5.csv  # Cleaned dataset used for training
```

### 3. ML pipeline overview

**Target**: `Prix`  
**Features**:
- Numeric: `Annee`, `Kilometrage`, `Puissance Fiscale`
- Categorical: `Marque`, `Modele`, `Carburant`, `Boite Vitesse`, `Etat Generale`

**Preprocessing** (`src/car_price_model/features.py`):
- Numeric
  - `SimpleImputer(strategy="median")`
  - `StandardScaler()`
- Categorical
  - `SimpleImputer(strategy="most_frequent")`
  - `OneHotEncoder(handle_unknown="ignore")`

**Model** (`src/car_price_model/model.py`):
- Baseline: `RandomForestRegressor` wrapped in a `Pipeline`
- Optional light **hyperparameter tuning** via `RandomizedSearchCV`
- Metrics:
  - **RMSE**
  - **MAE**
  - **R²**
- Reproducibility:
  - Configured `RANDOM_STATE`
  - Centralized config in `config.py`

### 4. Setup & local usage

#### 4.1. Install dependencies

```bash
pip install -r requirements.txt
```

> Tip: Use a virtual environment (`python -m venv .venv && .venv\Scripts\activate` on Windows).

#### 4.2. Train the model

From the project root:

```bash
python train.py
```

Optional: enable a (slower) hyperparameter search:

```bash
python train.py --tune
```

This will:
- load `Car-Data-Occasion-Clean-5.csv`
- train the model and print **RMSE / MAE / R²** for train and validation sets
- save the pipeline to `models/car_price_model.joblib`

### 5. Running the FastAPI backend

After training (so that `models/car_price_model.joblib` exists), start the API:

```bash
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

Endpoints:
- `GET /health` → `{"status": "ok"}`
- `POST /predict` → JSON with `predicted_price`

#### Example `curl` request

```bash
curl -X POST "http://localhost:8000/predict" ^
  -H "Content-Type: application/json" ^
  -d "{\"marque\": \"Toyota\", \"modele\": \"Yaris\", \"annee\": 2018, \"kilometrage\": 80000, \"carburant\": \"Essence\", \"boite_vitesse\": \"Manuelle\", \"puissance_fiscale\": 6.0, \"etat_generale\": \"Occasion\"}"
```

Example JSON response:

```json
{
  "predicted_price": 38000.0
}
```

### 6. Running the Streamlit UI

With the API running on `http://localhost:8000`:

```bash
streamlit run streamlit_app.py
```

The UI allows you to:
- input the same features as the API schema
- send them to the FastAPI backend
- visualize the predicted price in a clean layout

You can override the backend URL via the sidebar or by setting:

```bash
set CAR_PRICE_API_URL=http://localhost:8000
```

### 7. Design & code quality notes

- The code is organized into **separate modules** for:
  - data handling (`data.py`)
  - feature engineering (`features.py`)
  - modeling (`model.py`)
  - API schemas (`schemas.py`)
  - configuration (`config.py`)
- All new Python modules use **type hints** and **docstrings**.
- The model is encapsulated in an **sklearn `Pipeline`**:
  - safe from data leakage (preprocessing fit only on training data)
  - easy to version and deploy because the full pipeline is serialized.
- `RandomForestRegressor` gives a strong baseline and is **robust** with
  limited feature engineering, which is ideal for a portfolio project.

### 8. Ideas for further improvements

**Modeling**
- Try gradient boosting models (e.g. `HistGradientBoostingRegressor`, XGBoost, LightGBM).
- Perform more systematic hyperparameter optimization (Optuna, Bayesian optimization).
- Add cross-validation and learning curves to better diagnose over/underfitting.
- Log experiments with a tool like MLflow or Weights & Biases.

**Data & features**
- Enrich the dataset (e.g. scrape more sources, add region, color, options).
- Engineer domain-specific features (age of vehicle, log-km, interaction terms).
- Detect and handle remaining outliers with robust methods.

**Deployment**
- Package the app with **Docker**:
  - one container for FastAPI
  - one for Streamlit
  - or a single container running both.
- Deploy to cloud platforms (Render, Railway, Azure App Service, etc.).
- Add CI (GitHub Actions) to:
  - run tests
  - check formatting/linting
  - maybe trigger retraining on data changes.

**UI/UX**
- Make the Streamlit app bilingual (FR/EN).
- Add charts comparing the predicted price to:
  - distribution of prices for similar cars
  - minimum / maximum prices in the dataset.
- Display model confidence intervals or at least sensitivity to year / kilometrage.

---

This setup is designed to be **easy to run locally**, but it also follows
patterns that are common in production ML projects, making it well-suited
for inclusion in a professional portfolio or résumé.

