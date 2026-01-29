"""
CLI entrypoint for training the car price prediction model.

Usage
-----
    python train.py

This will:
- load the cleaned dataset
- train a RandomForest-based pipeline
- optionally run a light hyperparameter search
- print evaluation metrics
- persist the trained pipeline under `models/car_price_model.joblib`
"""

from __future__ import annotations

import argparse
from pprint import pprint

from src.car_price_model import model as model_module


def main() -> None:
    parser = argparse.ArgumentParser(description="Train car price prediction model.")
    parser.add_argument(
        "--tune",
        action="store_true",
        help="Run hyperparameter tuning with RandomizedSearchCV (slower).",
    )
    args = parser.parse_args()

    pipeline, train_metrics, val_metrics = model_module.train_and_evaluate(
        perform_hyperparameter_tuning=bool(args.tune)
    )

    print("Training metrics:")
    pprint(train_metrics.to_dict())

    print("\nValidation metrics:")
    pprint(val_metrics.to_dict())

    model_path = model_module.save_model(pipeline)
    print(f"\nModel saved to: {model_path}")


if __name__ == "__main__":
    main()

