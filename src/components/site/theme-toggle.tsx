import { motion } from "motion/react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative h-9 w-16 shrink-0 rounded-full border border-silver/30 bg-secondary p-1 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <motion.span
        className="absolute top-1 left-1 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground"
        animate={{ x: isDark ? 0 : 28, rotate: isDark ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          {isDark ? (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
            </>
          )}
        </motion.svg>
      </motion.span>
    </button>
  );
}
