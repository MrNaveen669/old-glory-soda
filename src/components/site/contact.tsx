import { motion } from "motion/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { PROFILE } from "./data";
import { Reveal, Section, SectionHeading } from "./primitives";

function Field({
  id,
  label,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const lifted = focused || value.length > 0;
  const shared = {
    id,
    name: id,
    required: true,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
    className:
      "peer w-full rounded-2xl border border-silver/25 bg-secondary/40 px-4 pt-6 pb-2 text-sm outline-none transition-colors focus:border-primary",
  };

  return (
    <div className="relative">
      {textarea ? <textarea rows={4} {...shared} /> : <input type={type} {...shared} />}
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-4 origin-left text-muted-foreground"
        animate={{
          y: lifted ? 10 : 18,
          scale: lifted ? 0.78 : 1,
          color: focused ? "var(--color-primary)" : "var(--color-muted-foreground)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {label}
      </motion.label>
      <motion.span
        className="absolute inset-x-4 bottom-2 h-px origin-left bg-highlight"
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function Contact() {
  const [sending, setSending] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent — I'll reply within a day.");
      form.reset();
      setResetKey((k) => k + 1);
    }, 900);
  };

  return (
    <Section id="contact">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something worth opening."
            intro="Freelance projects, collaborations, or just a good conversation about motion design — my inbox is open."
          />
          <Reveal delay={3}>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-8 inline-block font-display text-lg text-primary underline-offset-4 hover:underline"
            >
              {PROFILE.email}
            </a>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-8 flex flex-wrap gap-3">
              {PROFILE.socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.94 }}
                  className="glass-panel rounded-full px-4 py-2 text-sm transition-colors hover:border-highlight hover:text-highlight"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel space-y-4 rounded-3xl p-6 sm:p-8"
        >
          <Field key={`n${resetKey}`} id="name" label="Your name" />
          <Field key={`e${resetKey}`} id="email" label="Email address" type="email" />
          <Field key={`m${resetKey}`} id="message" label="What are you building?" textarea />
          <motion.button
            type="submit"
            disabled={sending}
            whileTap={{ scale: 0.97 }}
            className="glow-primary w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-70"
          >
            {sending ? "Sending…" : "Send message"}
          </motion.button>
        </motion.form>
      </div>
    </Section>
  );
}
