import { en } from "./en";
import { fr } from "./fr";
import { nl } from "./nl";

export type Language = "en" | "fr" | "nl";

export const translations = {
  en,
  fr,
  nl,
} as const;

export type Translation = typeof en | typeof fr | typeof nl;
