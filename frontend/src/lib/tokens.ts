/**
 * Hand-Drawn Design System — Design Tokens
 *
 * Single source of truth for colors, border-radii, shadows, and spacing
 * used across every component. Import from here, never hard-code values.
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
export const COLORS = {
  /** Warm paper background */
  BG: "#fdfbf7",
  /** Soft pencil black — never pure black */
  FG: "#2d2d2d",
  /** Old paper / erased pencil */
  MUTED: "#e5e0d8",
  /** Red correction marker */
  ACCENT: "#ff4d4d",
  /** Pencil lead border */
  BORDER: "#2d2d2d",
  /** Blue ballpoint pen */
  BLUE: "#2d5da1",
  /** Post-it yellow */
  POSTIT: "#fff9c4",
  /** Pure white for card backgrounds */
  WHITE: "#ffffff",
} as const;

// ---------------------------------------------------------------------------
// Wobbly Border Radii
// Multi-value border-radius must be set via inline `style` — these cannot be
// expressed as a single Tailwind class.
// ---------------------------------------------------------------------------
export const RADIUS = {
  /** Large wobbly oval — hero / big containers */
  WOBBLY: "255px 15px 225px 15px / 15px 225px 15px 255px",
  /** Medium wobbly — cards, form wrappers */
  WOBBLY_MD: "15px 255px 15px 225px / 225px 15px 255px 15px",
  /** Small wobbly — buttons, inputs, tags */
  WOBBLY_SM: "8px 120px 8px 100px / 100px 8px 120px 8px",
  /** Pill wobbly — badges, chips */
  WOBBLY_PILL: "60px 8px 60px 8px / 8px 60px 8px 60px",
} as const;

// ---------------------------------------------------------------------------
// Hard-Offset Shadows (no blur — cut-paper collage aesthetic)
// ---------------------------------------------------------------------------
export const SHADOW = {
  /** Subtle depth */
  SM: "3px 3px 0px 0px rgba(45,45,45,0.15)",
  /** Standard card / button shadow */
  MD: "4px 4px 0px 0px #2d2d2d",
  /** Emphasized / hover lift */
  LG: "8px 8px 0px 0px #2d2d2d",
  /** Pressed flat — active state */
  NONE: "0px 0px 0px 0px #2d2d2d",
  /** Hover reduced (button press-in feel) */
  HOVER: "2px 2px 0px 0px #2d2d2d",
  /** Blue accent shadow */
  BLUE: "4px 4px 0px 0px #2d5da1",
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
export const FONT = {
  HEADING: "var(--font-kalam), cursive",
  BODY: "var(--font-patrick), cursive",
} as const;
