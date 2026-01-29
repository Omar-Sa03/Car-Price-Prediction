"""
Model training, evaluation, persistence and inference utilities.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, Tuple

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import RandomizedSearchCV
from sklearn.pipeline import Pipeline

from . import config, data, features


@dataclass
class EvaluationResult:
    """Container for model evaluation metrics."""

    rmse: float
    mae: float
    r2: float

    def to_dict(self) -> Dict[str, float]:
        return {"rmse": self.rmse, "mae": self.mae, "r2": self.r2}


def build_model() -> Pipeline:
    """
    Build the full sklearn Pipeline (preprocessing + estimator).

    We start with a reasonably strong baseline model:
    - RandomForestRegressor (robust to non-linearities and mixed feature types)
    """
    preprocessor = features.build_preprocessing_pipeline()

    model = RandomForestRegressor(
        n_estimators=300,
        max_depth=None,
        min_samples_split=2,
        min_samples_leaf=1,
        random_state=config.RANDOM_STATE,
        n_jobs=-1,
    )

    pipe = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("model", model),
        ]
    )
    return pipe


def tune_hyperparameters(
    base_pipeline: Pipeline,
    X: pd.DataFrame,
    y: pd.Series,
    n_iter: int = 20,
    cv: int = 3,
    n_jobs: int = -1,
) -> Pipeline:
    """
    Perform a light RandomizedSearchCV around the RandomForest hyperparameters.

    The search space is intentionally modest so that this remains suitable for
    local/portfolio use without long training times.
    """
    param_distributions = {
        "model__n_estimators": [200, 300, 400, 500],
        "model__max_depth": [None, 10, 20, 30],
        "model__min_samples_split": [2, 5, 10],
        "model__min_samples_leaf": [1, 2, 4],
        "model__max_features": ["auto", "sqrt", 0.5],
    }

    search = RandomizedSearchCV(
        estimator=base_pipeline,
        param_distributions=param_distributions,
        n_iter=n_iter,
        cv=cv,
        verbose=1,
        n_jobs=n_jobs,
        scoring="neg_root_mean_squared_error",
        random_state=config.RANDOM_STATE,
    )
    search.fit(X, y)
    # We return the best_estimator_ which already includes the preprocessing.
    return search.best_estimator_


def evaluate(
    pipeline: Pipeline,
    X: pd.DataFrame,
    y_true: pd.Series,
) -> EvaluationResult:
    """Compute RMSE, MAE, and R² on the provided data."""
    y_pred = pipeline.predict(X)
    # Older versions of scikit-learn do not support the ``squared`` argument.
    # We therefore compute RMSE manually from the MSE to remain compatible.
    mse = mean_squared_error(y_true, y_pred)
    rmse = float(np.sqrt(mse))
    mae = mean_absolute_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)
    return EvaluationResult(rmse=rmse, mae=mae, r2=r2)


def train_and_evaluate(
    perform_hyperparameter_tuning: bool = False,
) -> Tuple[Pipeline, EvaluationResult, EvaluationResult]:
    """
    End-to-end training routine:
    - load data
    - split into train/validation
    - build (and optionally tune) the model
    - evaluate on both train and validation sets
    """
    df = data.load_clean_data()
    train_df, val_df = data.train_val_split(df)

    X_train = train_df[config.NUMERIC_FEATURES + config.CAT_FEATURES]
    y_train = train_df[config.TARGET_COLUMN]

    X_val = val_df[config.NUMERIC_FEATURES + config.CAT_FEATURES]
    y_val = val_df[config.TARGET_COLUMN]

    base_pipeline = build_model()

    if perform_hyperparameter_tuning:
        # For reproducibility and reasonable runtime, we keep n_iter fairly small.
        pipeline = tune_hyperparameters(base_pipeline, X_train, y_train)
    else:
        pipeline = base_pipeline
        pipeline.fit(X_train, y_train)

    train_metrics = evaluate(pipeline, X_train, y_train)
    val_metrics = evaluate(pipeline, X_val, y_val)

    return pipeline, train_metrics, val_metrics


def save_model(pipeline: Pipeline, path: str | Path | None = None) -> Path:
    """
    Persist the trained pipeline to disk using joblib.
    """
    model_path = Path(path) if path is not None else config.TRAINED_MODEL_PATH
    model_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipeline, model_path)
    return model_path


def load_model(path: str | Path | None = None) -> Pipeline:
    """
    Load a previously trained pipeline from disk.
    """
    model_path = Path(path) if path is not None else config.TRAINED_MODEL_PATH
    if not model_path.exists():
        raise FileNotFoundError(
            f"Trained model file not found at {model_path}. "
            "Make sure to run `python train.py` first."
        )
    pipeline: Pipeline = joblib.load(model_path)
    return pipeline


def predict_from_dict(pipeline: Pipeline, features_dict: Dict[str, Any]) -> float:
    """
    Convenience helper to perform a single prediction from a plain dictionary.

    This is mainly used by the API and Streamlit UI, which work with JSON-like dicts.
    """
    df = pd.DataFrame([features_dict])
    prediction = pipeline.predict(df)[0]
    # Ensure we return a plain Python float (not numpy scalar) for JSON serialization.
    return float(np.round(prediction, 2))

