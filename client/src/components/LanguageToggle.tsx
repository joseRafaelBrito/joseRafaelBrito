import { Globe } from "lucide-react";
import { type Language } from "@/lib/i18n";

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export function LanguageToggle({ currentLang, onToggle }: LanguageToggleProps) {
  return (
    <div className="fixed top-6 right-6 z-40 bg-black rounded-full p-2 shadow-lg border border-gray-800">
      <button 
        onClick={() => onToggle(currentLang === 'en' ? 'es' : 'en')}
        className="flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-300 hover:bg-blue-accent"
      >
        <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
        <Globe className="h-4 w-4" />
      </button>
    </div>
  );
}
