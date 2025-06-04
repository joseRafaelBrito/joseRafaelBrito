import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import { t, type Language } from "@/lib/i18n";

interface FooterProps {
  currentLang: Language;
}

export function Footer({ currentLang }: FooterProps) {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">{t("Get In Touch Footer", currentLang)}</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span>jose@automation.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <span>Miami, FL</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">{t("Services Footer", currentLang)}</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white transition-colors cursor-pointer">{t("AI Automation Footer", currentLang)}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("Restaurant Solutions", currentLang)}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("Real Estate Tools", currentLang)}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("Workflow Integration", currentLang)}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("Custom Development", currentLang)}</li>
            </ul>
          </motion.div>

          {/* Social & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">{t("Connect", currentLang)}</h3>
            <p className="text-gray-300 mb-6">
              {t("Ready to automate your business? Let's discuss how AI can transform your workflow.", currentLang)}
            </p>
            
            <motion.button
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 mb-6 w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("Schedule a Consultation", currentLang)}
            </motion.button>

            <div className="flex space-x-4">
              {[
                { icon: Github, href: "https://github.com/joseRafaelBrito" },
                { icon: Twitter, href: "https://x.com/estevez_brito" },
                { icon: Linkedin, href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-700 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-400">
            {t("© 2024 Jose Estevez. All rights reserved.", currentLang)}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {t("Empowering businesses through intelligent automation", currentLang)}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
