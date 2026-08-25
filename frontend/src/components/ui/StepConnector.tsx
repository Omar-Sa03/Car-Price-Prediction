/** Hand-drawn squiggly SVG connector between "How It Works" steps. Hidden on mobile. */
export function StepConnector() {
  return (
    <div className="hidden md:flex items-center justify-center w-24 shrink-0 -mt-4" aria-hidden="true">
      <svg
        width="96"
        height="32"
        viewBox="0 0 96 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 16 C12 6, 20 26, 28 16 C36 6, 44 26, 52 16 C60 6, 68 26, 76 16 C80 11, 86 13, 92 16"
          stroke="#2d2d2d"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrowhead */}
        <path
          d="M88 10 L94 16 L88 22"
          stroke="#2d2d2d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
