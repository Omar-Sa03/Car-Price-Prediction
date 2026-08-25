import React from "react";
import { COLORS, RADIUS, SHADOW } from "@/lib/tokens";

type Decoration = "tape" | "tack" | "none";

interface CardProps {
  decoration?: Decoration;
  variant?: "default" | "postit" | "muted";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  rotate?: string; // e.g. "rotate-1" or "-rotate-2"
}

export function Card({
  decoration = "none",
  variant = "default",
  className = "",
  style,
  children,
  rotate,
}: CardProps) {
  const bgColor =
    variant === "postit"
      ? COLORS.POSTIT
      : variant === "muted"
      ? COLORS.MUTED
      : COLORS.WHITE;

  return (
    <div
      className={`relative border-2 border-fg transition-all duration-150 ${rotate ?? ""} ${className}`}
      style={{
        borderRadius: RADIUS.WOBBLY_MD,
        boxShadow: SHADOW.SM,
        backgroundColor: bgColor,
        borderColor: COLORS.BORDER,
        ...style,
      }}
    >
      {/* Tape decoration */}
      {decoration === "tape" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-10px",
            left: "50%",
            transform: "translateX(-50%) rotate(-1.5deg)",
            width: "80px",
            height: "22px",
            backgroundColor: "rgba(200, 200, 200, 0.55)",
            borderRadius: "2px",
            border: "1px solid rgba(180,180,180,0.4)",
            zIndex: 10,
          }}
        />
      )}

      {/* Thumbtack decoration */}
      {decoration === "tack" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: COLORS.ACCENT,
            border: `2px solid ${COLORS.BORDER}`,
            boxShadow: "1px 1px 0px 0px #2d2d2d",
            zIndex: 10,
          }}
        />
      )}

      {children}
    </div>
  );
}
