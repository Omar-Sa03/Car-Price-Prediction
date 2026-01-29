"""
Feature engineering and preprocessing pipeline definitions.
"""

from __future__ import annotations

from typing import List

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from . import config


def build_preprocessing_pipeline(
    numeric_features: List[str] | None = None,
    categorical_features: List[str] | None = None,
) -> ColumnTransformer:
    """
    Build a preprocessing `ColumnTransformer` that:
    - Imputes missing numeric values with the median and scales them
    - Imputes missing categorical values with the most frequent value and one-hot encodes them
    """
    num_features = numeric_features or config.NUMERIC_FEATURES
    cat_features = categorical_features or config.CAT_FEATURES

    numeric_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )

    categorical_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore")),
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_pipeline, num_features),
            ("cat", categorical_pipeline, cat_features),
        ]
    )

    return preprocessor

