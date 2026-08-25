import React, { forwardRef } from "react";
import { COLORS, RADIUS } from "@/lib/tokens";

// ── Text / Number Input ──────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, className = "", style, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-patrick), cursive", color: COLORS.FG }}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          {...props}
          className={`
            w-full px-4 py-2.5 border-2 border-fg bg-white
            text-fg placeholder:text-fg/40 outline-none
            transition-all duration-100
            focus:border-blue focus:ring-2 focus:ring-blue/20
            ${className}
          `}
          style={{
            fontFamily: "var(--font-patrick), cursive",
            fontSize: "1rem",
            borderRadius: RADIUS.WOBBLY_SM,
            borderColor: error ? COLORS.ACCENT : COLORS.BORDER,
            color: COLORS.FG,
            backgroundColor: COLORS.WHITE,
            ...style,
          }}
        />
        {error && (
          <p className="text-xs" style={{ color: COLORS.ACCENT, fontFamily: "var(--font-patrick), cursive" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ── Select ───────────────────────────────────────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options, error, className = "", style, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-patrick), cursive", color: COLORS.FG }}
        >
          {label}
        </label>
        <select
          ref={ref}
          id={id}
          {...props}
          className={`
            w-full px-4 py-2.5 border-2 border-fg bg-white
            text-fg outline-none cursor-pointer
            transition-all duration-100
            focus:border-blue focus:ring-2 focus:ring-blue/20
            ${className}
          `}
          style={{
            fontFamily: "var(--font-patrick), cursive",
            fontSize: "1rem",
            borderRadius: RADIUS.WOBBLY_SM,
            borderColor: error ? COLORS.ACCENT : COLORS.BORDER,
            color: COLORS.FG,
            backgroundColor: COLORS.WHITE,
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%232d2d2d' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight: "2.5rem",
            ...style,
          }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs" style={{ color: COLORS.ACCENT, fontFamily: "var(--font-patrick), cursive" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
