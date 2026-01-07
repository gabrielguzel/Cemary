"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  name: string;
  description: string;
  included: string[];
  notIncluded: string[];
  timeline: string;
  priceRange: string;
  onSelect: () => void;
  isSelected?: boolean;
  note?: string;
}

export function PlanCard({
  name,
  description,
  included,
  notIncluded,
  timeline,
  priceRange,
  onSelect,
  isSelected = false,
  note,
}: PlanCardProps) {
  return (
    <motion.div
      className={cn(
        "relative p-8 rounded-2xl border-2 bg-surface transition-all shadow-sm",
        isSelected
          ? "border-accent shadow-lg shadow-accent/20"
          : "border-accent/30 hover:border-accent/60"
      )}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-text-primary">{name}</h3>
          <p className="text-text-secondary">{description}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-text-primary">Included:</h4>
          <ul className="space-y-2">
            {included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {notIncluded.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 text-text-primary">Not included:</h4>
            <ul className="space-y-2">
              {notIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-text-secondary/60 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-accent/30">
          <p className="text-sm text-text-secondary mb-1">Timeline: {timeline}</p>
          <p className="text-lg font-semibold text-text-primary">{priceRange}</p>
        </div>

        {note && (
          <div className="pt-2">
            <p className="text-xs text-text-secondary/80 italic">{note}</p>
          </div>
        )}

        <motion.button
          onClick={onSelect}
          className={cn(
            "w-full py-3 px-6 rounded-lg font-medium transition-colors shadow-sm",
            isSelected
              ? "bg-accent text-background hover:bg-accent/90"
              : "bg-accent/10 text-accent hover:bg-accent/20 border border-accent/30"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Request a quote
        </motion.button>
      </div>
    </motion.div>
  );
}
