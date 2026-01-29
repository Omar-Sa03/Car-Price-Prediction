"""
Configuration constants for the car price prediction project.

Keeping all "magic numbers" here helps ensure reproducibility and
makes it easier to tweak the experiment setup.
"""

from pathlib import Path

import numpy as np

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = PROJECT_ROOT
MODELS_DIR = PROJECT_ROOT / "models"

RAW_DATA_PATH = DATA_DIR / "Car-Data-Occasion.csv"
CLEAN_DATA_PATH = DATA_DIR / "Car-Data-Occasion-Clean-5.csv"
TRAINED_MODEL_PATH = MODELS_DIR / "car_price_model.joblib"

# Ensure directories exist at import time (idempotent)
MODELS_DIR.mkdir(parents=True, exist_ok=True)

# Reproducibility
RANDOM_STATE: int = 42
NP_RANDOM_GENERATOR = np.random.default_rng(RANDOM_STATE)

# Columns
TARGET_COLUMN = "Prix"

NUMERIC_FEATURES = ["Annee", "Kilometrage", "Puissance Fiscale"]
CAT_FEATURES = ["Marque", "Modele", "Carburant", "Boite Vitesse", "Etat Generale"]

