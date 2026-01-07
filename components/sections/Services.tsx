"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PlanCard } from "@/components/ui/PlanCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePlan } from "@/contexts/PlanContext";
import { scrollToSection } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Services() {
  const { t } = useLanguage();
  const { setSelectedPlan } = usePlan();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePlanSelect = (
    planId:
      | "advisory"
      | "website-essentials"
      | "website-configured"
      | "custom-build"
      | "retainer"
      | "automation"
      | "infrastructure"
  ) => {
    setSelectedPlan(planId);
    setTimeout(() => {
      scrollToSection("contact");
    }, 100);
  };

  const plans = t.services.plans;
  const totalPlans = plans.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPlans);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPlans) % totalPlans);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="services" className="py-20 px-4 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-text-primary">
              {t.services.title}
            </h2>
            <p className="text-lg text-text-secondary">
              {t.services.subtitle}
            </p>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center"
                >
                  <div className="w-full max-w-2xl mx-auto px-4">
                    <PlanCard
                      name={plans[currentIndex].name}
                      description={plans[currentIndex].description}
                      included={plans[currentIndex].included}
                      notIncluded={plans[currentIndex].notIncluded}
                      timeline={plans[currentIndex].timeline}
                      priceRange={plans[currentIndex].priceRange}
                      note={
                        "note" in plans[currentIndex]
                          ? plans[currentIndex].note
                          : undefined
                      }
                      onSelect={() =>
                        handlePlanSelect(
                          plans[currentIndex].id as
                            | "advisory"
                            | "website-essentials"
                            | "website-configured"
                            | "custom-build"
                            | "retainer"
                            | "automation"
                            | "infrastructure"
                        )
                      }
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-3 rounded-full bg-background border border-accent/30 shadow-lg hover:bg-accent hover:text-background transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-3 rounded-full bg-background border border-accent/30 shadow-lg hover:bg-accent hover:text-background transition-colors"
              aria-label="Next service"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-accent"
                      : "w-2 bg-accent/30 hover:bg-accent/60"
                  }`}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>

            {/* Service Counter */}
            <div className="text-center mt-4 text-sm text-text-secondary">
              {currentIndex + 1} / {totalPlans}
            </div>
          </div>

          {t.services.customNote && (
            <p className="text-center text-sm text-text-secondary mt-8 italic">
              {t.services.customNote}
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
