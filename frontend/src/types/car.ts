/**
 * TypeScript types mirroring the Pydantic schemas in src/car_price_model/schemas.py
 */

export type FuelType = "Essence" | "Diesel" | "Hybride" | "GPL" | "Autre";
export type GearboxType = "Manuelle" | "Automatique";

export interface CarFeatures {
  marque: string;
  modele: string;
  annee: number;
  kilometrage: number;
  carburant: FuelType;
  boite_vitesse: GearboxType;
  puissance_fiscale: number;
  etat_generale: string;
}

export interface PredictionResponse {
  predicted_price: number;
}

export interface PredictionState {
  result: PredictionResponse | null;
  loading: boolean;
  error: string | null;
}
