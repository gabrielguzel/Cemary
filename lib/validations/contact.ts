import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
  plan: z.enum(["advisory", "website-essentials", "website-configured", "custom-build", "retainer", "automation", "infrastructure"]).optional(),
  honeypot: z.string().max(0, "Spam detected"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
