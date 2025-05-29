import { t, type Language } from "@/lib/i18n";

interface FooterProps {
  currentLang: Language;
}

export function Footer({ currentLang }: FooterProps) {
  return (
    <footer className="py-12 px-6 lg:px-12 bg-dark-surface border-t border-dark-accent">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 mb-4">
          {t("© 2024 Alex Rivera. All rights reserved.", currentLang)}
        </p>
        <p className="text-gray-500 text-sm">
          {t("Built with passion for AI automation and modern web design.", currentLang)}
        </p>
      </div>
    </footer>
  );
}
