"""
FastAPI application exposing a prediction endpoint for car prices.
"""

from __future__ import annotations

from functools import lru_cache

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.car_price_model import model as model_module
from src.car_price_model import schemas

app = FastAPI(
    title="Car Price Prediction API",
    description="Predict used car prices based on basic features.",
    version="1.0.0",
)

# Allow local frontends  to call the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@lru_cache(maxsize=1)
def get_model():
    """
    Load and cache the trained model.

    Using LRU cache avoids re-loading the model for each request while keeping
    the implementation simple.
    """
    return model_module.load_model()


@app.get("/health")
def health() -> dict:
    """Simple health-check endpoint."""
    return {"status": "ok"}


@app.post("/predict", response_model=schemas.PredictionResponse)
def predict_price(payload: schemas.CarFeatures) -> schemas.PredictionResponse:
    """
    Predict the price of a car given its features.
    """
    pipeline = get_model()
    features_dict = payload.to_model_features()
    predicted_price = model_module.predict_from_dict(pipeline, features_dict)
    return schemas.PredictionResponse(predicted_price=predicted_price)


# For local debugging: `python -m api.main`
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)

