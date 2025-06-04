import { User, Code, Play, Star, Github, Twitter, Youtube, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { t, type Language } from "@/lib/i18n";

interface SidebarProps {
  currentLang: Language;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Sidebar({ currentLang, activeSection, onNavigate }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { id: "about", icon: User, label: "About Me" },
    { id: "projects", icon: Code, label: "Projects" },
    { id: "videos", icon: Play, label: "Videos" },
    { id: "reviews", icon: Star, label: "Reviews" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/joseRafaelBrito", hoverColor: "hover:text-white" },
    { icon: Twitter, href: "https://x.com/estevez_brito", hoverColor: "hover:text-blue-400" },
    { icon: Youtube, href: "https://youtube.com/@joseestevez", hoverColor: "hover:text-red-500" },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden bg-black p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-900"
      >
        {isMobileOpen ? <X className="text-white text-xl" /> : <Menu className="text-white text-xl" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.nav
        initial={{ x: "-100%" }}
        animate={{ 
          x: (isMobileOpen || (window.innerWidth >= 1024 && isVisible)) ? 0 : "-100%" 
        }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="fixed left-0 top-0 h-full w-64 border-r border-gray-800 z-30 shadow-2xl"
        style={{ backgroundColor: '#1e293b', borderColor: '#374151' }}
      >
        <div className="flex flex-col h-full p-6">
          
          {/* Profile Section */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 rounded-full mx-auto mb-3 bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-white font-bold text-lg">JE</span>
            </motion.div>
            <h3 className="text-lg font-semibold mb-1 text-white">Jose Estevez</h3>
            <p className="text-slate-400 text-xs">{t("AI Automator & Web Designer", currentLang)}</p>
          </div>

          {/* Navigation Menu */}
          <ul className="space-y-3 flex-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group text-sm ${
                    activeSection === item.id 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{t(item.label as any, currentLang)}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-700">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
