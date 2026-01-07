"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToSection } from "@/lib/utils";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 text-text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t.hero.headline}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t.hero.role}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            onClick={() => scrollToSection("services")}
            className="px-8 py-4 rounded-lg bg-accent text-background font-semibold hover:bg-accent/90 transition-colors shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.hero.primaryCta}
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 rounded-lg border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.hero.secondaryCta}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
