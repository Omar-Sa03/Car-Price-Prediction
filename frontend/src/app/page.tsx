import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PredictorForm } from "@/components/sections/PredictorForm";
import { About } from "@/components/sections/About";
import { NavBar } from "@/components/NavBar";
import { COLORS } from "@/lib/tokens";

function Footer() {
  return (
    <footer
      className="w-full border-t-2 border-dashed border-fg py-8 px-6"
      style={{ borderColor: COLORS.BORDER }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-sm opacity-60"
          style={{ fontFamily: "var(--font-patrick), cursive" }}
        >
          Built as a portfolio project — Tunisian used car market data 🇹🇳
        </p>
        <p
          className="text-sm opacity-40"
          style={{ fontFamily: "var(--font-patrick), cursive" }}
        >
          RandomForest · scikit-learn · FastAPI · Next.js
        </p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Hero />

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6">
          <hr className="divider-dashed" />
        </div>

        <HowItWorks />

        <div className="max-w-5xl mx-auto px-6">
          <hr className="divider-dashed" />
        </div>

        <PredictorForm />

        <div className="max-w-5xl mx-auto px-6">
          <hr className="divider-dashed" />
        </div>

        <About />
      </main>
      <Footer />
    </div>
  );
}
