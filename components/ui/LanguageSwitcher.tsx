"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇧🇪" },
  { code: "nl", label: "Nederlands", flag: "🇧🇪" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang =
    languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-background border border-accent/30 hover:bg-accent hover:text-background transition-colors shadow-sm flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLang.flag}
        </span>
      </motion.button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-surface border border-accent/30 rounded-lg shadow-lg z-50 min-w-[150px] overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-accent/20 transition-colors ${
                  language === lang.code ? "bg-accent/10 font-semibold" : ""
                }`}
              >
                <span>{lang.flag}</span>
                <span className="text-sm text-text-primary">{lang.label}</span>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
