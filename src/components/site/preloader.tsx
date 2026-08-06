import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1650);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative h-24 w-12 overflow-hidden rounded-t-full rounded-b-md border border-silver/40">
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-primary"
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-highlight"
                style={{ left: `${12 + i * 15}%` }}
                animate={{ y: [0, -60], opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
          <motion.p
            className="mt-6 font-display text-xs tracking-[0.42em] text-muted-foreground uppercase"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            Pouring
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
