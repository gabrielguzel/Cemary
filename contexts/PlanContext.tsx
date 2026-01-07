"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PlanType =
  | "advisory"
  | "website-essentials"
  | "website-configured"
  | "custom-build"
  | "retainer"
  | "automation"
  | "infrastructure"
  | null;

interface PlanContextType {
  selectedPlan: PlanType;
  setSelectedPlan: (plan: PlanType) => void;
  clearPlan: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);

  const clearPlan = () => setSelectedPlan(null);

  return (
    <PlanContext.Provider value={{ selectedPlan, setSelectedPlan, clearPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
