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
          <div className="relative h-28 w-14 overflow-hidden rounded-t-full rounded-b-lg border-2 border-silver/50">
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
                animate={{ y: [0, -70], opacity: [0, 1, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeOut" }}
              />
            ))}
            <motion.span
              className="absolute top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-silver"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.p
            className="mt-6 font-brand text-xs tracking-[0.42em] text-muted-foreground uppercase"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            Old Glory
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
