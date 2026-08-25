import { Card } from "@/components/ui/Card";
import { SectionTag } from "@/components/ui/SectionTag";
import { COLORS, RADIUS, SHADOW } from "@/lib/tokens";

const stats = [
  { value: "5 000+", label: "Used car listings", labelFr: "annonces de voitures d'occasion" },
  { value: "R² ≈ 0.87", label: "Model accuracy", labelFr: "précision du modèle" },
  { value: "Random Forest", label: "Algorithm", labelFr: "algorithme" },
  { value: "Tunisia 🇹🇳", label: "Market", labelFr: "marché" },
];

const features = [
  { name: "Marque & Modèle", desc: "Brand + model combination" },
  { name: "Année", desc: "Year of first registration" },
  { name: "Kilométrage", desc: "Odometer reading (km)" },
  { name: "Carburant", desc: "Fuel type (Essence / Diesel / …)" },
  { name: "Boîte de vitesse", desc: "Manual or automatic" },
  { name: "Puissance fiscale", desc: "Fiscal horsepower (CV)" },
];

export function About() {
  return (
    <section
      id="about"
      className="w-full py-20 px-6"
      aria-labelledby="about-heading"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionTag rotate={2} color="muted">
            About the model
          </SectionTag>
          <h2
            id="about-heading"
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG }}
          >
            Trained on real listings
          </h2>
          <p
            className="text-base md:text-lg opacity-70 max-w-2xl"
            style={{ fontFamily: "var(--font-patrick), cursive" }}
          >
            The model was built from scraped Tunisian used-car marketplace data, cleaned,
            and trained using a scikit-learn Pipeline with a Random Forest Regressor.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2"];
            return (
              <div
                key={stat.value}
                className={`flex flex-col items-center justify-center p-5 border-2 border-fg text-center ${rotations[i % rotations.length]}`}
                style={{
                  borderRadius: RADIUS.WOBBLY,
                  backgroundColor: i % 2 === 0 ? COLORS.POSTIT : COLORS.WHITE,
                  boxShadow: SHADOW.SM,
                  minHeight: "110px",
                }}
              >
                <span
                  className="text-xl md:text-2xl font-bold"
                  style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs opacity-60 mt-1"
                  style={{ fontFamily: "var(--font-patrick), cursive" }}
                >
                  {stat.label}
                  <br />
                  <em>{stat.labelFr}</em>
                </span>
              </div>
            );
          })}
        </div>

        {/* Two-column: features + speech bubble */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Feature list */}
          <Card decoration="none" className="p-6 md:p-8">
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG }}
            >
              Input features
            </h3>
            <ul className="flex flex-col gap-3">
              {features.map((f) => (
                <li key={f.name} className="flex gap-3 items-start">
                  <span
                    className="mt-1 shrink-0 w-5 h-5 flex items-center justify-center border-2 border-fg text-xs font-bold"
                    style={{
                      borderRadius: RADIUS.WOBBLY,
                      backgroundColor: COLORS.MUTED,
                    }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <div>
                    <span
                      className="font-bold text-base"
                      style={{ fontFamily: "var(--font-kalam), cursive" }}
                    >
                      {f.name}
                    </span>
                    <span
                      className="ml-2 text-sm opacity-60"
                      style={{ fontFamily: "var(--font-patrick), cursive" }}
                    >
                      — {f.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Speech bubble "ML says" */}
          <div className="flex flex-col gap-6">
            {/* Speech bubble card */}
            <div className="relative">
              <Card
                variant="postit"
                className="p-6 -rotate-1"
                style={{ boxShadow: SHADOW.MD }}
              >
                <p
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: "var(--font-patrick), cursive", color: COLORS.FG }}
                >
                  <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "var(--font-kalam), cursive" }}
                  >
                    &ldquo;
                  </span>
                  On the Tunisian market, <strong>mileage and age</strong> are the biggest price drivers —
                  but the <strong>brand + model combination</strong> can swing value by ±30%.
                  <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "var(--font-kalam), cursive" }}
                  >
                    &rdquo;
                  </span>
                </p>
                <p
                  className="mt-3 text-sm opacity-60 text-right"
                  style={{ fontFamily: "var(--font-patrick), cursive" }}
                >
                  — the ML model, probably
                </p>
              </Card>

              {/* Speech bubble tail */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "-18px",
                  left: "32px",
                  width: 0,
                  height: 0,
                  borderLeft: "16px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: `18px solid ${COLORS.BORDER}`,
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "-14px",
                  left: "34px",
                  width: 0,
                  height: 0,
                  borderLeft: "14px solid transparent",
                  borderRight: "7px solid transparent",
                  borderTop: `16px solid ${COLORS.POSTIT}`,
                }}
              />
            </div>

            {/* Pipeline overview */}
            <Card decoration="none" variant="muted" className="p-5">
              <h4
                className="text-lg font-bold mb-3"
                style={{ fontFamily: "var(--font-kalam), cursive" }}
              >
                Pipeline
              </h4>
              <ol className="flex flex-col gap-2">
                {[
                  "SimpleImputer (median / most_frequent)",
                  "StandardScaler (numeric)",
                  "OneHotEncoder (categorical, handle_unknown='ignore')",
                  "RandomForestRegressor (n_estimators=100)",
                ].map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-2 items-start text-sm"
                    style={{ fontFamily: "var(--font-patrick), cursive" }}
                  >
                    <span className="shrink-0 font-bold opacity-40">{i + 1}.</span>
                    <code className="break-all">{step}</code>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
