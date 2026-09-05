import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { CloseCircle, HamburgerMenu, Location } from "iconsax-reactjs";
import { NAV_LINKS } from "./data";
import { OldGloryLogo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { scrollToSection } from "./use-lenis";

export function Navbar() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
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

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHomepage) return;
    event.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    go(id);
  };

  const sectionHref = (id: string) => (isHomepage ? `#${id}` : `/#${id}`);

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
        <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 lg:flex lg:justify-between">
          <a
            href={sectionHref("hero")}
            onClick={(event) => navigateToSection(event, "hero")}
            className="flex min-h-11 min-w-0 items-center text-left"
            aria-label="Old Glory Soda — back to top"
          >
            <OldGloryLogo
              className={`h-9 w-auto sm:h-10 ${scrolled ? "text-foreground" : "text-hero-text"}`}
            />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={sectionHref(link.id)}
                onClick={(event) => navigateToSection(event, link.id)}
                className={`relative min-h-11 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
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
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href={sectionHref("stores")}
              onClick={(event) => navigateToSection(event, "stores")}
              className="hidden min-h-11 items-center gap-1.5 rounded-full bg-accent-cta px-5 py-2.5 text-xs font-bold tracking-wider text-on-accent uppercase shadow-md transition-all hover:scale-105 hover:bg-accent-hover active:scale-95 dark:text-bg-base sm:inline-flex"
            >
              <Location size={16} variant="Linear" />
              Find Old Glory
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-border-theme bg-bg-base text-accent-primary lg:hidden"
            >
              {open ? (
                <CloseCircle size={20} variant="Linear" />
              ) : (
                <HamburgerMenu size={20} variant="Linear" />
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
              className="overflow-hidden border-t border-border-theme/70 bg-bg-base/95 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3 sm:px-5">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={sectionHref(link.id)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    onClick={(event) => navigateToSection(event, link.id)}
                    className={`min-h-11 rounded-xl px-4 py-2.5 text-left text-base ${
                      active === link.id ? "bg-secondary text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href={sectionHref("stores")}
                  onClick={(event) => navigateToSection(event, "stores")}
                  className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent-cta px-4 text-sm font-bold text-bg-base sm:hidden"
                >
                  <Location size={18} variant="Linear" />
                  Find Old Glory
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
