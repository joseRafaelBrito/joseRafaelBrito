import { useState, useEffect } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Sidebar } from "@/components/Sidebar";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { VideosSection } from "@/components/VideosSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Footer } from "@/components/Footer";
import { type Language } from "@/lib/i18n";

export default function Portfolio() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState('about');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'videos', 'reviews'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-dark-primary text-white font-inter overflow-x-hidden">
      <LanguageToggle currentLang={currentLang} onToggle={setCurrentLang} />
      <Sidebar 
        currentLang={currentLang} 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
      />
      
      <main className="lg:mr-80 min-h-screen">
        <AboutSection currentLang={currentLang} />
        <ProjectsSection currentLang={currentLang} />
        <VideosSection currentLang={currentLang} />
        <ReviewsSection currentLang={currentLang} />
        <Footer currentLang={currentLang} />
      </main>
    </div>
  );
}
