import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { CloseCircle, HambergerMenu, Location } from "iconsax-reactjs";
import { NAV_LINKS } from "./data";
import { ThemeToggle } from "./theme-toggle";
import { scrollToSection } from "./use-lenis";

export function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="h-0.5 origin-left bg-destructive"
        style={{ scaleX: progress }}
        aria-hidden
      />
      <div
        className={`transition-all duration-500 ${scrolled ? "glass-panel border-x-0 border-t-0" : "border-transparent bg-transparent"}`}
      >
        <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:flex lg:justify-between">
          <button
            onClick={() => go("hero")}
            className="flex min-w-0 items-center gap-2 text-left"
            aria-label="Back to top"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-destructive font-brand text-xs text-destructive-foreground">
              OG
            </span>
            <span className="truncate font-brand text-sm tracking-tight">
              OLD GLORY<span className="text-primary"> SODA</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === link.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => go("stores")}
              className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 sm:inline-flex"
            >
              <Location size={16} variant="Linear" />
              Find a Store
            </button>
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-silver/30 lg:hidden"
            >
              {open ? (
                <CloseCircle size={20} variant="Linear" />
              ) : (
                <HambergerMenu size={20} variant="Linear" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-1 px-5 pb-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    onClick={() => go(link.id)}
                    className={`rounded-xl px-4 py-3 text-left text-base ${
                      active === link.id ? "bg-secondary text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
