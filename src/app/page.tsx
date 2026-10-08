import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { ImprovementsTeaser } from '@/components/sections/ImprovementsTeaser';
import { MediaStrip } from '@/components/sections/MediaStrip';
import { Impact } from '@/components/sections/Impact';
import { HowToHelp } from '@/components/sections/HowToHelp';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <ImprovementsTeaser />
        <MediaStrip />
        <Impact />
        <HowToHelp />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
