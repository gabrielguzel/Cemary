"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SectionIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress =
        (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-1 z-40 pointer-events-none">
      <motion.div
        className="absolute top-0 left-0 w-full bg-accent origin-top"
        style={{
          height: `${scrollProgress}%`,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.1 }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-accent/20" />
    </div>
  );
}
