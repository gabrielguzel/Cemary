"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Layout, Code, Rocket, LifeBuoy } from "lucide-react";
import { motion } from "framer-motion";

const icons = {
  Search,
  Layout,
  Code,
  Rocket,
  LifeBuoy,
};

export function Process() {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-20 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-text-primary">{t.process.title}</h2>
            <p className="text-lg text-text-secondary">
              {t.process.subtitle}
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent/30 hidden md:block" />
            <div className="space-y-12">
              {t.process.steps.map((step, idx) => {
                const Icon = icons[step.icon as keyof typeof icons];
                return (
                  <motion.div
                    key={step.id}
                    className="relative flex items-start gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center shadow-sm">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl font-bold mb-2 text-text-primary">{step.name}</h3>
                      <p className="text-text-secondary">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
