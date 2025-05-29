import { User, Code, Play, Star, Github, Twitter, Youtube, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { t, type Language } from "@/lib/i18n";

interface SidebarProps {
  currentLang: Language;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Sidebar({ currentLang, activeSection, onNavigate }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "about", icon: User, label: "About Me" },
    { id: "projects", icon: Code, label: "Projects" },
    { id: "videos", icon: Play, label: "Videos" },
    { id: "reviews", icon: Star, label: "Reviews" },
  ];

  const socialLinks = [
    { icon: Github, href: "#", hoverColor: "hover:text-white" },
    { icon: Twitter, href: "#", hoverColor: "hover:text-blue-400" },
    { icon: Youtube, href: "#", hoverColor: "hover:text-red-500" },
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
        className="fixed top-6 right-6 z-50 lg:hidden bg-dark-surface p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-dark-accent"
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
        initial={{ x: "100%" }}
        animate={{ x: isMobileOpen || window.innerWidth >= 1024 ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="fixed right-0 top-0 h-full w-80 bg-dark-surface border-l border-dark-accent z-30"
      >
        <div className="flex flex-col h-full p-8">
          
          {/* Profile Section */}
          <div className="text-center mb-12">
            <motion.img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200" 
              alt="Alex Rivera Profile" 
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-accent shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <h3 className="text-xl font-semibold mb-2">Alex Rivera</h3>
            <p className="text-gray-400 text-sm">{t("AI Automator & Web Designer", currentLang)}</p>
          </div>

          {/* Navigation Menu */}
          <ul className="space-y-6 flex-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group ${
                    activeSection === item.id 
                      ? 'bg-blue-accent text-white' 
                      : 'hover:bg-blue-accent text-gray-300 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{t(item.label as any, currentLang)}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className={`text-gray-400 transition-colors duration-300 ${social.hoverColor}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
