"use client";

import { COLORS, RADIUS, SHADOW } from "@/lib/tokens";

/** Interactive CTA anchor styled like the primary Button. Client component. */
export function HeroCta({ href, id, children }: { href: string; id: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      id={id}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-normal border-[3px] no-underline transition-all duration-100"
      style={{
        fontFamily: "var(--font-patrick), cursive",
        borderRadius: RADIUS.WOBBLY_SM,
        boxShadow: SHADOW.MD,
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
        el.style.boxShadow = SHADOW.MD;
        el.style.transform = "translate(0,0)";
      }}
    >
      {children}
    </a>
  );
}
