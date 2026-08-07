import { motion, useReducedMotion } from "motion/react";

/** Rising fizz bubbles. Purely decorative, disabled for reduced-motion users. */
export function Bubbles({
  count = 14,
  color = "var(--color-primary)",
  className = "",
}: {
  count?: number;
  color?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const size = 5 + (i % 5) * 4;
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full opacity-50"
            style={{
              left: `${(i * 97) % 100}%`,
              width: size,
              height: size,
              background: color,
              animation: `bubble-rise ${12 + (i % 6) * 3}s linear ${i * 0.9}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Codd-neck (goli) soda bottle silhouette with liquid, marble and condensation. */
export function Bottle({
  color = "#1FA2E8",
  tint = "#7FD0FF",
  label,
  className = "",
  animated = true,
}: {
  color?: string;
  tint?: string;
  label?: string;
  className?: string;
  animated?: boolean;
}) {
  const reduced = useReducedMotion();
  const fizz = animated && !reduced;

  return (
    <svg viewBox="0 0 120 340" className={className} role="img" aria-label={label ?? "Soda bottle"}>
      <defs>
        <linearGradient id={`glass-${color.slice(1)}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={tint} stopOpacity="0.95" />
          <stop offset="42%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
        <clipPath id={`clip-${color.slice(1)}`}>
          <path d="M40 62c0 16-22 30-22 62v182a22 22 0 0 0 22 22h40a22 22 0 0 0 22-22V124c0-32-22-46-22-62V40H40Z" />
        </clipPath>
      </defs>

      {/* body outline */}
      <path
        d="M40 62c0 16-22 30-22 62v182a22 22 0 0 0 22 22h40a22 22 0 0 0 22-22V124c0-32-22-46-22-62V40H40Z"
        fill="var(--color-silver)"
        fillOpacity="0.14"
        stroke="var(--color-silver)"
        strokeOpacity="0.55"
        strokeWidth="2.5"
      />

      <g clipPath={`url(#clip-${color.slice(1)})`}>
        <rect x="10" y="96" width="100" height="240" fill={`url(#glass-${color.slice(1)})`} />
        {/* label band */}
        <rect x="10" y="176" width="100" height="86" fill="var(--color-background)" opacity="0.82" />
        <rect x="10" y="176" width="100" height="6" fill="#D62828" />
        <rect x="10" y="256" width="100" height="6" fill="#D62828" />
        <text
          x="60"
          y="214"
          textAnchor="middle"
          className="font-display"
          fill={color}
          fontSize="17"
          fontWeight="700"
        >
          GOLI
        </text>
        <text
          x="60"
          y="238"
          textAnchor="middle"
          fill="var(--color-foreground)"
          fontSize="9"
          letterSpacing="2"
        >
          SODA
        </text>

        {/* interior fizz */}
        {fizz &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <motion.circle
              key={i}
              cx={30 + i * 12}
              r={2 + (i % 3)}
              fill="#fff"
              fillOpacity="0.7"
              initial={{ cy: 320 }}
              animate={{ cy: [320, 110], opacity: [0, 0.85, 0] }}
              transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, delay: i * 0.35 }}
            />
          ))}
        {/* highlight */}
        <rect x="26" y="96" width="9" height="240" fill="#fff" opacity="0.22" rx="4" />
      </g>

      {/* neck + marble */}
      <path
        d="M40 40h40v24H40z"
        fill="var(--color-silver)"
        fillOpacity="0.2"
        stroke="var(--color-silver)"
        strokeOpacity="0.5"
        strokeWidth="2.5"
      />
      <motion.circle
        cx="60"
        cy="56"
        r="9"
        fill="var(--color-silver)"
        stroke="#fff"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        animate={fizz ? { cy: [56, 50, 56] } : {}}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* cap */}
      <rect x="36" y="16" width="48" height="26" rx="7" fill="#D62828" />
      <rect x="36" y="16" width="48" height="8" rx="4" fill="#fff" fillOpacity="0.25" />
    </svg>
  );
}
