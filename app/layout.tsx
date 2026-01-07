import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { PlanProvider } from "@/contexts/PlanContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CEMARY — IT Consulting & Product Delivery | Belgium",
  description:
    "CEMARY is a Belgium-based IT consulting firm. From strategy to shipped software: architecture, automation, integrations, and product delivery.",
  keywords: [
    "CEMARY",
    "IT consulting",
    "Belgium",
    "product delivery",
    "systems architecture",
    "automation",
    "integrations",
    "fullstack development",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <PlanProvider>{children}</PlanProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
