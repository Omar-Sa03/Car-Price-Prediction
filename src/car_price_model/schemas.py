"""
Pydantic models shared between the FastAPI backend and other components.
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class CarFeatures(BaseModel):
    """Input schema describing the features required for price prediction."""

    marque: str = Field(..., description="Brand of the car (e.g. 'Toyota').")
    modele: str = Field(..., description="Model of the car (e.g. 'Yaris').")
    annee: int = Field(..., ge=1980, le=2100, description="Year of first registration.")
    kilometrage: int = Field(
        ...,
        ge=0,
        le=1_500_000,
        description="Odometer value in kilometers.",
    )
    carburant: str = Field(..., description="Fuel type (e.g. Essence, Diesel, Hybride).")
    boite_vitesse: str = Field(
        ...,
        description="Gearbox type (e.g. Manuelle, Automatique).",
    )
    puissance_fiscale: float = Field(
        ...,
        ge=1,
        le=50,
        description="Fiscal horsepower of the car.",
    )
    etat_generale: Literal["Occasion"] | str = Field(
        "Occasion",
        description="General condition (kept flexible, but typically 'Occasion').",
    )

    def to_model_features(self) -> dict:
        """
        Convert API-facing field names (snake_case, lowercase) to the exact
        column names expected by the trained model.
        """
        return {
            "Marque": self.marque,
            "Modele": self.modele,
            "Annee": self.annee,
            "Kilometrage": self.kilometrage,
            "Carburant": self.carburant,
            "Boite Vitesse": self.boite_vitesse,
            "Puissance Fiscale": self.puissance_fiscale,
            "Etat Generale": self.etat_generale,
        }


class PredictionResponse(BaseModel):
    """Response schema returned by the prediction endpoint."""

    predicted_price: float = Field(..., description="Predicted price in the dataset currency.")

