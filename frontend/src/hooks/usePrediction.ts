"use client";

import { useState } from "react";
import type { CarFeatures, PredictionResponse, PredictionState } from "@/types/car";

const DEFAULT_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export function usePrediction() {
  const [state, setState] = useState<PredictionState>({
    result: null,
    loading: false,
    error: null,
  });

  const [apiBaseUrl, setApiBaseUrl] = useState<string>(DEFAULT_API_URL);

  async function submitPrediction(data: CarFeatures): Promise<void> {
    setState({ result: null, loading: true, error: null });

    try {
      const url = `${apiBaseUrl.replace(/\/$/, "")}/predict`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error ${response.status}: ${text}`);
      }

      const json: PredictionResponse = await response.json();
      setState({ result: json, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setState({ result: null, loading: false, error: message });
    }
  }

  function reset() {
    setState({ result: null, loading: false, error: null });
  }

  return {
    ...state,
    apiBaseUrl,
    setApiBaseUrl,
    submitPrediction,
    reset,
  };
}
