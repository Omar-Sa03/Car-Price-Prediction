import type { Metadata } from "next";
import { Kalam, Patrick_Hand } from "next/font/google";
import "./globals.css";

const kalam = Kalam({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patrick",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CarEstim — Estimation du Prix de Voiture | Tunisia",
  description:
    "Obtenez une estimation instantanée du prix de votre voiture d'occasion sur le marché tunisien grâce à notre modèle de machine learning. Get an instant AI-powered price estimate for used cars in Tunisia.",
  keywords: ["car price", "voiture occasion", "prix voiture", "Tunisia", "estimation", "machine learning"],
  openGraph: {
    title: "CarEstim — Estimation du Prix de Voiture",
    description: "Instant AI price estimates for used cars in Tunisia.",
    locale: "fr_TN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${kalam.variable} ${patrickHand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
