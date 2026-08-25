"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { COLORS, RADIUS, SHADOW } from "@/lib/tokens";
import type { PredictionResponse } from "@/types/car";

interface PriceResultProps {
  result: PredictionResponse | null;
  error: string | null;
  onReset: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-TN", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price);
}

export function PriceResult({ result, error, onReset }: PriceResultProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll into view on mount / result change
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [result, error]);

  if (error) {
    return (
      <div ref={containerRef} className="animate-bounce-in">
        <Card
          className="p-6 md:p-8 flex flex-col items-center gap-4 text-center"
          style={{
            backgroundColor: "#fff5f5",
            borderColor: COLORS.ACCENT,
            borderWidth: "3px",
            borderRadius: RADIUS.WOBBLY_MD,
            boxShadow: `6px 6px 0px 0px ${COLORS.ACCENT}`,
          }}
        >
          <span className="text-4xl" aria-hidden="true">✗</span>
          <h3
            className="text-2xl"
            style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.ACCENT }}
          >
            Oops! Something went wrong
          </h3>
          <p
            className="text-sm max-w-sm opacity-80 font-mono break-all"
            style={{ fontFamily: "var(--font-patrick), cursive", color: COLORS.FG }}
          >
            {error}
          </p>
          <p
            className="text-xs opacity-60"
            style={{ fontFamily: "var(--font-patrick), cursive" }}
          >
            Make sure the FastAPI backend is running at the configured URL.
          </p>
          <Button variant="secondary" size="sm" onClick={onReset}>
            Try again ↩
          </Button>
        </Card>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div ref={containerRef} className="animate-bounce-in">
      <Card
        decoration="tack"
        variant="postit"
        className="p-8 md:p-12 flex flex-col items-center gap-4 text-center rotate-1"
        style={{
          boxShadow: SHADOW.LG,
          borderWidth: "3px",
        }}
      >
        {/* Label */}
        <p
          className="text-base md:text-lg opacity-70"
          style={{ fontFamily: "var(--font-patrick), cursive", color: COLORS.FG }}
        >
          Prix estimé — Estimated price
        </p>

        {/* Big price */}
        <div className="relative">
          <span
            className="text-5xl md:text-7xl font-bold leading-none"
            style={{
              fontFamily: "var(--font-kalam), cursive",
              color: COLORS.FG,
            }}
          >
            {formatPrice(result.predicted_price)}
          </span>
          <span
            className="ml-2 text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG, opacity: 0.6 }}
          >
            TND
          </span>

          {/* Wavy underline */}
          <svg
            className="absolute -bottom-3 left-0 w-full"
            height="10"
            viewBox="0 0 200 10"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 5 C20 0, 40 10, 60 5 C80 0, 100 10, 120 5 C140 0, 160 10, 180 5 C190 2, 196 6, 200 5"
              stroke={COLORS.ACCENT}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Disclaimer */}
        <p
          className="text-xs opacity-60 max-w-sm mt-2"
          style={{ fontFamily: "var(--font-patrick), cursive" }}
        >
          Les prix sont estimés dans la même devise que le jeu de données d&apos;entraînement (TND).
          <br />
          Prices are estimates — actual market value may vary.
        </p>

        {/* Reset */}
        <Button variant="secondary" size="sm" onClick={onReset} className="mt-2">
          ↩ Nouvelle estimation
        </Button>
      </Card>
    </div>
  );
}
