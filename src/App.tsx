import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { CasesAndProcessSection } from './components/CasesAndProcessSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectBriefingSection } from './components/ProjectBriefingSection';
import { SolutionsSection } from './components/SolutionsSection';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F8F9FB] text-[#11141A]">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <SolutionsSection />
          <CasesAndProcessSection />
          <ProjectBriefingSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
