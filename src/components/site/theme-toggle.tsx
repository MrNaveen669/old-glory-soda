import { motion } from "motion/react";
import { Moon, Sun1 } from "iconsax-reactjs";
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
        {isDark ? (
          <Moon size={16} variant="Bold" color="currentColor" />
        ) : (
          <Sun1 size={16} variant="Bold" color="currentColor" />
        )}
      </motion.span>
    </button>
  );
}
