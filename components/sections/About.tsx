"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h2 className="text-4xl font-bold mb-8 text-center text-text-primary">
            {t.navigation.sections.find((s) => s.id === "about")?.label || "About"}
          </h2>
          <p className="text-lg text-text-secondary mb-12 leading-relaxed">
            {t.about.text}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {t.about.skills.map((skill, idx) => (
              <motion.span
                key={skill}
                className="px-4 py-2 rounded-full bg-surface text-text-primary border border-accent/20 font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.1, borderColor: "var(--color-accent)" }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
