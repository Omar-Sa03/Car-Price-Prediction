"use client";

import { COLORS, RADIUS, SHADOW } from "@/lib/tokens";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#about", label: "About" },
];

export function NavBar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b-2"
      style={{
        backgroundColor: "rgba(253,251,247,0.92)",
        backdropFilter: "blur(6px)",
        borderColor: COLORS.BORDER,
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-5xl mx-auto w-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 no-underline"
          aria-label="CarEstim home"
        >
          <span
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG }}
          >
            🚗 CarEstim
          </span>
        </a>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-base hidden sm:block"
              style={{ fontFamily: "var(--font-patrick), cursive", color: COLORS.FG }}
            >
              {link.label}
            </a>
          ))}

          {/* Predict CTA button */}
          <a
            href="#predictor"
            id="nav-predict-btn"
            className="inline-flex items-center px-4 py-2 border-2 text-sm font-bold transition-all duration-100 no-underline"
            style={{
              fontFamily: "var(--font-patrick), cursive",
              borderRadius: RADIUS.WOBBLY_SM,
              boxShadow: SHADOW.SM,
              backgroundColor: COLORS.WHITE,
              color: COLORS.FG,
              borderColor: COLORS.BORDER,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = COLORS.ACCENT;
              el.style.color = COLORS.WHITE;
              el.style.boxShadow = SHADOW.HOVER;
              el.style.transform = "translate(2px,2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = COLORS.WHITE;
              el.style.color = COLORS.FG;
              el.style.boxShadow = SHADOW.SM;
              el.style.transform = "translate(0,0)";
            }}
          >
            Predict now ↓
          </a>
        </div>
      </div>
    </nav>
  );
}
