"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { COLORS, RADIUS } from "@/lib/tokens";

interface ApiConfigProps {
  apiBaseUrl: string;
  onUrlChange: (url: string) => void;
}

export function ApiConfig({ apiBaseUrl, onUrlChange }: ApiConfigProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        id="api-config-toggle"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm opacity-60 hover:opacity-90 transition-opacity"
        style={{ fontFamily: "var(--font-patrick), cursive", color: COLORS.FG }}
        aria-expanded={open}
        aria-controls="api-config-panel"
      >
        <span>{open ? "▲" : "▼"}</span>
        <span>⚙ API Settings</span>
      </button>

      {open && (
        <div
          id="api-config-panel"
          className="mt-3 p-4 border-2 border-dashed border-fg"
          style={{
            borderRadius: RADIUS.WOBBLY_SM,
            backgroundColor: COLORS.MUTED,
          }}
        >
          <Input
            id="api-base-url"
            label="API base URL"
            type="url"
            value={apiBaseUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="http://localhost:8000"
          />
          <p
            className="mt-2 text-xs opacity-60"
            style={{ fontFamily: "var(--font-patrick), cursive" }}
          >
            Override with env var: <code>NEXT_PUBLIC_API_URL</code>
          </p>
        </div>
      )}
    </div>
  );
}
