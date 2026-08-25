"use client";

import { useState, useId } from "react";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTag } from "@/components/ui/SectionTag";
import { PriceResult } from "@/components/sections/PriceResult";
import { ApiConfig } from "@/components/sections/ApiConfig";
import { usePrediction } from "@/hooks/usePrediction";
import { COLORS, RADIUS } from "@/lib/tokens";
import type { CarFeatures, FuelType, GearboxType } from "@/types/car";

const FUEL_OPTIONS = [
  { value: "Essence", label: "Essence" },
  { value: "Diesel", label: "Diesel" },
  { value: "Hybride", label: "Hybride" },
  { value: "GPL", label: "GPL" },
  { value: "Autre", label: "Autre" },
];

const GEARBOX_OPTIONS = [
  { value: "Manuelle", label: "Manuelle" },
  { value: "Automatique", label: "Automatique" },
];

const DEFAULT_FORM: CarFeatures = {
  marque: "Toyota",
  modele: "Yaris",
  annee: 2018,
  kilometrage: 80000,
  carburant: "Essence",
  boite_vitesse: "Manuelle",
  puissance_fiscale: 6,
  etat_generale: "Occasion",
};

export function PredictorForm() {
  const uid = useId();
  const [form, setForm] = useState<CarFeatures>(DEFAULT_FORM);
  const { result, loading, error, apiBaseUrl, setApiBaseUrl, submitPrediction, reset } =
    usePrediction();

  function field(name: keyof CarFeatures) {
    return `${uid}-${name}`;
  }

  function handleChange(name: keyof CarFeatures, value: string | number) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (result || error) reset();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitPrediction(form);
  }

  return (
    <section
      id="predictor"
      className="w-full py-20 px-6"
      aria-labelledby="predictor-heading"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionTag rotate={-1} color="postit">
            🚗 Prédire maintenant
          </SectionTag>
          <h2
            id="predictor-heading"
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG }}
          >
            What&apos;s your car worth?
          </h2>
          <p
            className="text-base md:text-lg opacity-70 max-w-xl"
            style={{ fontFamily: "var(--font-patrick), cursive" }}
          >
            Fill in the details below — we&apos;ll do the rest.
            <br />
            <span className="opacity-80">
              Remplissez les détails ci-dessous et nous ferons le reste.
            </span>
          </p>
        </div>

        {/* Form card */}
        <Card
          decoration="tape"
          className="p-6 md:p-10"
          style={{ borderRadius: RADIUS.WOBBLY_MD }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="flex flex-col gap-5">
                <Input
                  id={field("marque")}
                  label="Marque"
                  placeholder="ex: Toyota"
                  value={form.marque}
                  onChange={(e) => handleChange("marque", e.target.value)}
                  required
                />
                <Input
                  id={field("modele")}
                  label="Modèle"
                  placeholder="ex: Yaris"
                  value={form.modele}
                  onChange={(e) => handleChange("modele", e.target.value)}
                  required
                />
                <Input
                  id={field("annee")}
                  label="Année"
                  type="number"
                  min={1980}
                  max={2100}
                  value={form.annee}
                  onChange={(e) => handleChange("annee", Number(e.target.value))}
                  required
                />
                <Input
                  id={field("kilometrage")}
                  label="Kilométrage (km)"
                  type="number"
                  min={0}
                  max={1500000}
                  step={1000}
                  value={form.kilometrage}
                  onChange={(e) => handleChange("kilometrage", Number(e.target.value))}
                  required
                />
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-5">
                <Select
                  id={field("carburant")}
                  label="Carburant"
                  options={FUEL_OPTIONS}
                  value={form.carburant}
                  onChange={(e) => handleChange("carburant", e.target.value as FuelType)}
                />
                <Select
                  id={field("boite_vitesse")}
                  label="Boîte de vitesse"
                  options={GEARBOX_OPTIONS}
                  value={form.boite_vitesse}
                  onChange={(e) => handleChange("boite_vitesse", e.target.value as GearboxType)}
                />
                <Input
                  id={field("puissance_fiscale")}
                  label="Puissance fiscale (CV)"
                  type="number"
                  min={1}
                  max={50}
                  step={0.5}
                  value={form.puissance_fiscale}
                  onChange={(e) => handleChange("puissance_fiscale", Number(e.target.value))}
                  required
                />
                <Input
                  id={field("etat_generale")}
                  label="État général"
                  value={form.etat_generale}
                  onChange={(e) => handleChange("etat_generale", e.target.value)}
                />
              </div>
            </div>

            {/* API config (collapsible) */}
            <div className="mt-6">
              <ApiConfig apiBaseUrl={apiBaseUrl} onUrlChange={setApiBaseUrl} />
            </div>

            {/* Submit */}
            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                size="lg"
                id="predictor-submit-btn"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Calcul en cours…" : "Prédire le prix →"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Result */}
        {(result || error) && (
          <PriceResult result={result} error={error} onReset={reset} />
        )}
      </div>
    </section>
  );
}
