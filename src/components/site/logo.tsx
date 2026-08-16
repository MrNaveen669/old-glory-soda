type LogoProps = {
  className?: string;
  title?: string;
};

/**
 * Hand-drawn vintage soda script wordmark: "Old Glory".
 * Built from heavy round brush strokes (no font dependency) so it stays
 * bold and consistent everywhere, and inherits currentColor from the theme.
 */
export function OldGloryLogo({ className, title = "Old Glory Soda" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 340 120"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <title>{title}</title>

      {/* upward diagonal tilt: left lower, right higher */}
      <g transform="rotate(-7 170 60)">
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* --- OLD --- */}
          {/* O */}
          <path
            d="M46 52c-3-11-14-15-22-9-9 7-12 24-6 33 5 8 16 9 22 1 6-7 8-18 6-25z"
            strokeWidth="9"
          />
          {/* l */}
          <path d="M58 22c4 12 3 32 1 40 -1 6 2 9 7 6" strokeWidth="9" />
          {/* d */}
          <path
            d="M96 24c3 14 1 32-1 41 -1 5 2 8 6 6M94 48c-8-5-18-1-21 8-3 8 2 15 9 14 6-1 10-7 12-14"
            strokeWidth="9"
          />
        </g>

        {/* --- GLORY (larger) --- */}
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* G with entry swash */}
          <path
            d="M108 92c14-6 22-16 30-30M164 46c-2-13-16-19-27-12-13 8-18 30-9 41 8 10 23 6 27-6 1-4 1-8 0-11h-14"
            strokeWidth="12"
          />
          {/* l */}
          <path d="M176 16c6 18 4 46 1 58 -1 6 3 9 8 6" strokeWidth="12" />
          {/* o */}
          <path
            d="M212 52c-9-5-19 1-21 11-2 9 5 15 13 12 8-3 12-14 8-20z"
            strokeWidth="12"
          />
          {/* r */}
          <path d="M232 78c-2-12-1-20 1-26 3 8 8 11 15 9" strokeWidth="12" />
          {/* Y with long sweeping tail curl */}
          <path
            d="M256 48c1 12 5 20 11 24 5-6 8-15 9-25"
            strokeWidth="12"
          />
          <path
            d="M276 47c2 22-1 40-9 50-6 8-15 9-18 2-2-6 2-11 9-13 16-4 40-3 62 4 8 3 12 8 10 13-2 5-9 5-13 1"
            strokeWidth="10"
          />
        </g>

        {/* soda ink-splash flourishes */}
        <g fill="currentColor">
          <path d="M296 22c9-6 18-8 27-6-8 3-15 6-21 11-2 2-8-3-6-5z" />
          <circle cx="322" cy="10" r="4.2" />
          <circle cx="308" cy="6" r="2.6" />
          <circle cx="330" cy="24" r="2.4" />
          <circle cx="318" cy="86" r="3.4" />
          <circle cx="330" cy="79" r="2.2" />
        </g>
      </g>
    </svg>
  );
}
