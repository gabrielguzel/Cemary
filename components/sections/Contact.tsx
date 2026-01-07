"use client";

import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePlan } from "@/contexts/PlanContext";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  const { t } = useLanguage();
  const { selectedPlan, clearPlan } = usePlan();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    plan: selectedPlan || undefined,
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, plan: selectedPlan }));
    }
  }, [selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const validated = contactFormSchema.parse(formData);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
          plan: undefined,
          honeypot: "",
        });
        clearPlan();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-surface/30">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-text-primary">{t.contact.title}</h2>
            <p className="text-lg text-text-secondary">
              {t.contact.subtitle}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-text-primary">
                {t.contact.form.name}
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/30 bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-text-primary">
                {t.contact.form.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/30 bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="plan" className="block mb-2 font-medium text-text-primary">
                {t.contact.form.plan}
              </label>
              <select
                id="plan"
                value={formData.plan || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    plan: e.target.value as "advisory" | "website-essentials" | "website-configured" | "custom-build" | "retainer" | "automation" | "infrastructure" | undefined,
                  })
                }
                className="w-full px-4 py-3 rounded-lg border border-accent/30 bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              >
                <option value="">{t.contact.form.planPlaceholder}</option>
                {t.services.plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-text-primary">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/30 bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none transition-colors"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-lg bg-accent text-background font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting
                ? t.contact.form.sending
                : t.contact.form.submit}
            </motion.button>
            {submitStatus === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-accent font-medium"
              >
                {t.contact.form.success}
              </motion.p>
            )}
            {submitStatus === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-accent font-medium"
              >
                {t.contact.form.error}
              </motion.p>
            )}
          </form>
          <div className="mt-12 text-center">
            <p className="flex items-center justify-center gap-2 text-text-secondary">
              <MapPin className="w-4 h-4" />
              {t.contact.location}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
