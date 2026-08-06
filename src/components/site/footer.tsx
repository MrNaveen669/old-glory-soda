import { motion } from "motion/react";
import { PROFILE } from "./data";
import { scrollToSection } from "./use-lenis";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-border px-5 py-10"
    >
      <div className="mx-auto grid max-w-6xl gap-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-1.5 w-10 shrink-0 rounded-full bg-destructive" />
          <p className="truncate text-sm text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name}. Built with a little fizz.
          </p>
        </div>
        <button
          onClick={() => scrollToSection("hero")}
          className="text-sm text-muted-foreground transition-colors hover:text-highlight"
        >
          Back to top ↑
        </button>
      </div>
    </motion.footer>
  );
}
