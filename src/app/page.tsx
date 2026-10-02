import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { Project } from '@/components/sections/Project';
import { Impact } from '@/components/sections/Impact';
import { MediaStrip } from '@/components/sections/MediaStrip';
import { HowToHelp } from '@/components/sections/HowToHelp';
import { Contact } from '@/components/sections/Contact';
import { Journal } from '@/components/sections/Journal';
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
        <Project />
        <Impact />
        <MediaStrip />
        <HowToHelp />
        <Contact />
        <Journal />
      </main>

      <Footer />
    </>
  );
}

