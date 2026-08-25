import React from "react";
import { COLORS, RADIUS, SHADOW } from "@/lib/tokens";

interface SectionTagProps {
  children: React.ReactNode;
  rotate?: number; // degrees, e.g. -2 or 1
  color?: "postit" | "accent" | "muted";
}

export function SectionTag({ children, rotate = -1, color = "postit" }: SectionTagProps) {
  const bgColor =
    color === "accent"
      ? COLORS.ACCENT
      : color === "muted"
      ? COLORS.MUTED
      : COLORS.POSTIT;

  const textColor = color === "accent" ? COLORS.WHITE : COLORS.FG;

  return (
    <span
      className="inline-block px-4 py-1 text-sm font-bold border-2 border-fg"
      style={{
        fontFamily: "var(--font-patrick), cursive",
        backgroundColor: bgColor,
        color: textColor,
        borderColor: COLORS.BORDER,
        borderRadius: RADIUS.WOBBLY_PILL,
        boxShadow: SHADOW.SM,
        transform: `rotate(${rotate}deg)`,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}
