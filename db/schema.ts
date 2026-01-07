import { pgTable, uuid, text, timestamp, inet } from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  plan: text("plan"),
  message: text("message").notNull(),
  source: text("source"),
  user_agent: text("user_agent"),
  ip: inet("ip"),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
