"""
Streamlit UI for interacting with the car price prediction API.

Run with:
    streamlit run streamlit_app.py
"""

from __future__ import annotations

import os

import requests
import streamlit as st

API_URL = os.getenv("CAR_PRICE_API_URL", "http://localhost:8000")


def main() -> None:
    st.set_page_config(page_title="Car Price Predictor", page_icon="🚗", layout="centered")
    st.title("Car Price Predictor")
    st.markdown(
        "Enter the car details below and this app will estimate its price "
        "using a machine learning model trained on Tunisian used car listings."
    )

    st.sidebar.header("API configuration")
    api_url = st.sidebar.text_input("API base URL", API_URL)

    with st.form("car_form"):
        col1, col2 = st.columns(2)
        with col1:
            marque = st.text_input("Marque", value="Toyota")
            modele = st.text_input("Modèle", value="Yaris")
            annee = st.number_input("Année", min_value=1980, max_value=2100, value=2018)
            kilometrage = st.number_input(
                "Kilométrage (km)", min_value=0, max_value=1_500_000, value=80_000, step=1_000
            )
        with col2:
            carburant = st.selectbox(
                "Carburant", ["Essence", "Diesel", "Hybride", "GPL", "Autre"], index=0
            )
            boite_vitesse = st.selectbox("Boîte de vitesse", ["Manuelle", "Automatique"], index=0)
            puissance_fiscale = st.number_input(
                "Puissance fiscale", min_value=1.0, max_value=50.0, value=6.0, step=0.5
            )
            etat_generale = st.text_input("État général", value="Occasion")

        submitted = st.form_submit_button("Prédire le prix")

    if submitted:
        payload = {
            "marque": marque,
            "modele": modele,
            "annee": int(annee),
            "kilometrage": int(kilometrage),
            "carburant": carburant,
            "boite_vitesse": boite_vitesse,
            "puissance_fiscale": float(puissance_fiscale),
            "etat_generale": etat_generale,
        }

        try:
            response = requests.post(f"{api_url.rstrip('/')}/predict", json=payload, timeout=10)
            response.raise_for_status()
            data = response.json()
            predicted_price = data.get("predicted_price")
            st.success(f"Prix estimé : **{predicted_price:,.0f}**")
            st.caption("Les prix sont estimés dans la même devise que le jeu de données d'entraînement.")
        except requests.RequestException as exc:
            st.error(f"Erreur lors de l'appel à l'API: {exc}")


if __name__ == "__main__":
    main()

