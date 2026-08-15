type LogoProps = {
  className?: string;
  title?: string;
};

/**
 * Hand-lettered vintage "Old Glory" script wordmark with splash/drip flourishes.
 * Pure inline SVG — inherits currentColor so it follows the theme ink color.
 */
export function OldGloryLogo({ className, title = "Old Glory Soda" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 320 110"
      role="img"
      aria-label={title}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* script wordmark */}
      <text
        x="8"
        y="78"
        fontFamily='"Yellowtail", "Baloo 2", cursive'
        fontSize="72"
        letterSpacing="-1"
        fill="currentColor"
      >
        Old Glory
      </text>

      {/* top-right splash flourish */}
      <g fill="currentColor">
        <path d="M262 24c10-9 22-13 36-12-12 3-22 7-30 14-2 2-8-0-6-2z" />
        <circle cx="306" cy="9" r="4" />
        <circle cx="292" cy="4" r="2.6" />
        <circle cx="315" cy="20" r="2.2" />
      </g>

      {/* bottom-right drip flourish */}
      <g fill="currentColor">
        <path d="M236 88c16 6 33 8 52 6-14 6-31 8-48 5-3-1-6-10-4-11z" />
        <path d="M281 96c3 0 5 4 5 8s-2 6-5 6-5-2-5-6 2-8 5-8z" />
        <circle cx="298" cy="101" r="3.2" />
        <circle cx="309" cy="94" r="2" />
      </g>
    </svg>
  );
}
