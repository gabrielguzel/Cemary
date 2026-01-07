"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useLanguage } from "@/contexts/LanguageContext";

export function Work() {
  const { t } = useLanguage();

  return (
    <section id="work" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-text-primary">{t.work.title}</h2>
            <p className="text-lg text-text-secondary">
              {t.work.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.work.projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
