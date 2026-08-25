import React from "react";
import { COLORS, RADIUS, SHADOW } from "@/lib/tokens";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
}

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-base",
  md: "px-6 py-3 text-lg",
  lg: "px-8 py-4 text-xl md:text-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  style,
  children,
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      {...props}
      className={`
        group relative inline-flex items-center justify-center gap-2
        font-body font-normal border-[3px] border-fg cursor-pointer
        select-none transition-all duration-100
        active:translate-x-[4px] active:translate-y-[4px]
        ${sizeStyles[size]}
        ${className}
      `}
      style={{
        fontFamily: "var(--font-patrick), cursive",
        borderRadius: RADIUS.WOBBLY_SM,
        boxShadow: SHADOW.MD,
        backgroundColor: isPrimary ? COLORS.WHITE : COLORS.MUTED,
        color: COLORS.FG,
        borderColor: COLORS.BORDER,
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = isPrimary ? COLORS.ACCENT : COLORS.BLUE;
        el.style.color = COLORS.WHITE;
        el.style.boxShadow = SHADOW.HOVER;
        el.style.transform = "translate(2px, 2px)";
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = isPrimary ? COLORS.WHITE : COLORS.MUTED;
        el.style.color = COLORS.FG;
        el.style.boxShadow = SHADOW.MD;
        el.style.transform = "translate(0px, 0px)";
        props.onMouseLeave?.(e);
      }}
      onMouseDown={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = SHADOW.NONE;
        el.style.transform = "translate(4px, 4px)";
        props.onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = SHADOW.HOVER;
        el.style.transform = "translate(2px, 2px)";
        props.onMouseUp?.(e);
      }}
    >
      {children}
    </button>
  );
}
