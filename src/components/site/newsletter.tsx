import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Send2, Sms } from "iconsax-reactjs";
import { toast } from "sonner";
import { Bubbles } from "./bottle";
import { Reveal, Section } from "./primitives";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("That email looks a little flat. Try again?");
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setEmail("");
      toast.success("You're on the list. Stay fizzy!");
    }, 700);
  };

  return (
    <Section id="newsletter">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-silver/20 bg-card px-6 py-12 sm:px-12 sm:py-16">
          <span
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(90% 70% at 15% 0%, var(--color-primary), transparent 60%)",
            }}
          />
          <Bubbles count={12} color="var(--color-highlight)" />

          <div className="relative mx-auto max-w-xl text-center">
            <span className="ribbon inline-flex items-center gap-2 px-4 py-1.5 font-display text-[11px] tracking-[0.28em] uppercase">
              Stay fizzy
            </span>
            <h2 className="mt-5 font-brand text-3xl text-balance sm:text-4xl">
              New flavours, first pour.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Drops, limited batches and where the next crate lands — straight to your inbox. No spam,
              only soda.
            </p>

            <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Sms
                  size={18}
                  variant="Linear"
                  className={`absolute top-1/2 left-4 -translate-y-1/2 transition-colors ${
                    focused ? "text-highlight" : "text-muted-foreground"
                  }`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="w-full rounded-full border border-silver/30 bg-background/70 py-3 pr-4 pl-11 text-sm outline-none transition-colors focus:border-highlight"
                />
                <motion.span
                  className="absolute inset-x-5 -bottom-0.5 h-0.5 origin-left rounded bg-highlight"
                  initial={false}
                  animate={{ scaleX: focused ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <motion.button
                type="submit"
                whileTap={{ scale: 0.96 }}
                disabled={sending}
                className="glow-primary inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-70"
              >
                {sending ? "Pouring…" : "Sign me up"}
                <Send2 size={18} variant="Linear" />
              </motion.button>
            </form>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
