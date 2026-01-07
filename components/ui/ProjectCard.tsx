"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: readonly string[];
  delay?: number;
}

export function ProjectCard({
  title,
  description,
  tags,
  delay = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      className="group relative p-6 rounded-xl border border-accent/30 bg-surface hover:border-accent/60 transition-all shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, rotateX: 2, rotateY: 2 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <h3 className="text-xl font-bold mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
