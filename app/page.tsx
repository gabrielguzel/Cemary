import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { OrbNavigator } from "@/components/navigation/OrbNavigator";
import { SectionIndicator } from "@/components/navigation/SectionIndicator";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export default function Home() {
  return (
    <main className="relative">
      <SectionIndicator />
      <div className="fixed top-8 right-8 z-50 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <OrbNavigator />
      <Hero />
      <About />
      <Services />
      <Work />
      <Process />
      <Contact />
    </main>
  );
}
