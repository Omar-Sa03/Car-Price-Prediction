import { COLORS, RADIUS, SHADOW } from "@/lib/tokens";
import { HeroCta } from "@/components/ui/HeroCta";

/** Inline hand-drawn SVG arrow pointing left, used to direct attention to CTA */
function HandDrawnArrow() {
  return (
    <svg
      width="80"
      height="48"
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M70 8 C60 8, 20 10, 8 30"
        stroke={COLORS.ACCENT}
        strokeWidth="2.5"
        strokeDasharray="5 3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 30 L14 20 M8 30 L18 34"
        stroke={COLORS.ACCENT}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Decorative car sketch SVG for the hero right column */
function CarSketch() {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[280px]">
      {/* Corner frame marks */}
      {[
        "top-2 left-2",
        "top-2 right-2 rotate-90",
        "bottom-2 left-2 -rotate-90",
        "bottom-2 right-2 rotate-180",
      ].map((pos, i) => (
        <svg
          key={i}
          className={`absolute ${pos} w-6 h-6`}
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.FG}
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M2 10 L2 2 L10 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ))}

      {/* The car SVG illustration */}
      <svg
        viewBox="0 0 320 180"
        className="w-full max-w-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Hand-drawn car illustration"
      >
        {/* Body */}
        <path
          d="M30 120 C30 120, 45 80, 90 65 C120 55, 195 50, 230 65 C260 78, 285 100, 290 120"
          stroke={COLORS.FG}
          strokeWidth="3"
          strokeLinecap="round"
          fill={COLORS.MUTED}
        />
        {/* Roof */}
        <path
          d="M90 65 C100 42, 130 28, 170 26 C210 24, 230 42, 240 65"
          stroke={COLORS.FG}
          strokeWidth="3"
          strokeLinecap="round"
          fill={COLORS.WHITE}
        />
        {/* Windshield */}
        <path
          d="M118 65 C122 46, 140 35, 165 34 C190 33, 215 46, 220 65"
          stroke={COLORS.FG}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="rgba(45,93,161,0.15)"
        />
        {/* Side window */}
        <path
          d="M120 65 C116 55, 108 50, 100 65"
          stroke={COLORS.FG}
          strokeWidth="2"
          strokeLinecap="round"
          fill="rgba(45,93,161,0.1)"
        />
        {/* Chassis / underbody */}
        <rect
          x="25"
          y="118"
          width="270"
          height="16"
          rx="6"
          ry="6"
          fill={COLORS.FG}
          opacity="0.08"
        />
        {/* Door lines */}
        <path
          d="M155 65 L158 118"
          stroke={COLORS.FG}
          strokeWidth="2"
          strokeDasharray="4 2"
          strokeLinecap="round"
        />
        {/* Front wheel */}
        <circle cx="82" cy="128" r="26" fill={COLORS.WHITE} stroke={COLORS.FG} strokeWidth="3" />
        <circle cx="82" cy="128" r="12" fill={COLORS.MUTED} stroke={COLORS.FG} strokeWidth="2" />
        {/* Rear wheel */}
        <circle cx="238" cy="128" r="26" fill={COLORS.WHITE} stroke={COLORS.FG} strokeWidth="3" />
        <circle cx="238" cy="128" r="12" fill={COLORS.MUTED} stroke={COLORS.FG} strokeWidth="2" />
        {/* Headlight */}
        <ellipse cx="288" cy="98" rx="8" ry="10" fill={COLORS.POSTIT} stroke={COLORS.FG} strokeWidth="2" />
        {/* Taillight */}
        <ellipse cx="32" cy="98" rx="8" ry="10" fill={COLORS.ACCENT} stroke={COLORS.FG} strokeWidth="2" opacity="0.7" />
        {/* Speed lines */}
        <path d="M10 85 L40 85" stroke={COLORS.MUTED} strokeWidth="2" strokeDasharray="3 2" strokeLinecap="round" />
        <path d="M6 100 L35 100" stroke={COLORS.MUTED} strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" />
        <path d="M12 115 L38 115" stroke={COLORS.MUTED} strokeWidth="1" strokeDasharray="3 2" strokeLinecap="round" />
      </svg>

      {/* Bouncing decorative circle — desktop only */}
      <div
        className="hidden md:block absolute -bottom-4 -right-4 w-14 h-14 border-[3px] border-dashed"
        style={{
          borderRadius: RADIUS.WOBBLY,
          backgroundColor: COLORS.POSTIT,
          borderColor: COLORS.BORDER,
          animation: "bounce 3s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="w-full py-20 px-6"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow tag */}
          <span
            className="inline-block self-start px-4 py-1 text-sm font-bold border-2 -rotate-1"
            style={{
              fontFamily: "var(--font-patrick), cursive",
              backgroundColor: COLORS.POSTIT,
              borderRadius: RADIUS.WOBBLY_PILL,
              boxShadow: SHADOW.SM,
              borderColor: COLORS.BORDER,
            }}
          >
            🇹🇳 Marché Tunisien
          </span>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-5xl md:text-7xl leading-tight"
            style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG }}
          >
            Estimate Your Car&apos;s Price{" "}
            <span
              className="inline-block"
              style={{
                color: COLORS.ACCENT,
                animation: "spin-slow 6s linear infinite",
                display: "inline-block",
              }}
            >
              ✦
            </span>
          </h1>

          {/* Bilingual subheadline */}
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: "var(--font-patrick), cursive", color: COLORS.FG }}
          >
            Get an instant AI estimate for any used car on the Tunisian market.
            <br />
            <span className="opacity-60 text-base">
              Obtenez une estimation instantanée du prix de votre voiture d&apos;occasion.
            </span>
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <HeroCta href="#predictor" id="hero-cta-btn">
              Prédire le prix →
            </HeroCta>
            <div className="hidden md:flex flex-col items-center -mt-2 -ml-2">
              <HandDrawnArrow />
              <span
                className="text-xs -rotate-3"
                style={{ fontFamily: "var(--font-patrick), cursive", color: COLORS.ACCENT }}
              >
                tap me!
              </span>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-6 pt-2">
            {[
              { label: "listings trained on", value: "5 000+" },
              { label: "model accuracy", value: "R² ≈ 0.87" },
              { label: "features used", value: "8" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-sm opacity-60"
                  style={{ fontFamily: "var(--font-patrick), cursive" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Car sketch */}
        <div className="flex items-center justify-center">
          <div
            className="w-full p-6 border-2 border-dashed border-fg"
            style={{
              borderRadius: RADIUS.WOBBLY_MD,
              backgroundColor: "rgba(253,251,247,0.6)",
            }}
          >
            <CarSketch />
          </div>
        </div>
      </div>
    </section>
  );
}
