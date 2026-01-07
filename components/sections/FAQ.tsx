"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { content } from "@/lib/content";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function FAQ() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{content.faq.title}</h2>
          </div>
          <Accordion.Root type="single" collapsible className="space-y-4">
            {content.faq.questions.map((item, idx) => (
              <Accordion.Item
                key={item.id}
                value={`item-${item.id}`}
                className="border border-border rounded-lg overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors group">
                    <span className="font-semibold">{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 py-4 text-muted-foreground data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  {item.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </AnimatedSection>
      </div>
    </section>
  );
}
