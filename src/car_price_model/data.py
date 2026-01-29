"""
Data loading and splitting utilities for the car price prediction model.
"""

from __future__ import annotations

from typing import Tuple

import pandas as pd
from sklearn.model_selection import train_test_split

from . import config


def load_clean_data(path: str | None = None) -> pd.DataFrame:
    """
    Load the cleaned car dataset.

    Parameters
    ----------
    path:
        Optional path override. If not provided, the default configured path is used.
    """
    data_path = config.CLEAN_DATA_PATH if path is None else path
    df = pd.read_csv(data_path)

    # Basic sanity check to fail fast if the CSV is not in the expected shape.
    expected_cols = set(
        config.NUMERIC_FEATURES + config.CAT_FEATURES + [config.TARGET_COLUMN]
    )
    missing_cols = expected_cols - set(df.columns)
    if missing_cols:
        raise ValueError(f"Missing expected columns in data: {missing_cols}")

    return df


def train_val_split(
    df: pd.DataFrame,
    test_size: float = 0.2,
) -> Tuple[pd.DataFrame, pd.DataFrame]:
    """
    Split the dataframe into train and validation sets.

    We use a simple random split because the data does not appear to be time-series.
    """
    train_df, val_df = train_test_split(
        df,
        test_size=test_size,
        random_state=config.RANDOM_STATE,
    )
    return train_df, val_df

