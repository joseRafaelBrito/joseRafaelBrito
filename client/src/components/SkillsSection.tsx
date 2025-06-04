import { motion } from "framer-motion";
import { Code, MessageCircle, Globe, Wrench } from "lucide-react";
import { t, type Language } from "@/lib/i18n";

interface SkillsSectionProps {
  currentLang: Language;
}

export function SkillsSection({ currentLang }: SkillsSectionProps) {
  const skills = [
    {
      icon: MessageCircle,
      title: "Sales & Communication",
      items: [
        "Bilingual English/Spanish",
        "5+ years in high-performance sales environments",
        "Customer-centric and solution-driven"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Code,
      title: "Python Programming",
      items: [
        "Automation scripting",
        "API integrations",
        "Data handling and workflow logic"
      ],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Wrench,
      title: "AI Automation",
      items: [
        "AI content generation with ChatGPT API",
        "Workflow automation using n8n, Zapier, and Make",
        "Chatbot flows and customer service integrations"
      ],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Globe,
      title: "Web Development",
      items: [
        "Front-end: HTML, CSS, JavaScript",
        "Back-end scripting with Python",
        "Webhooks, APIs, and automation-ready sites"
      ],
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-12 bg-dark-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="text-2xl">🛠️</span>
            {t("Skills", currentLang)}
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-dark-primary rounded-xl p-6 shadow-lg border border-dark-accent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} mr-4`}>
                  <skill.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{t(skill.title as any, currentLang)}</h3>
              </div>
              
              <ul className="space-y-3">
                {skill.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-blue-accent mr-3 mt-1">🔹</span>
                    <span className="text-gray-300">{t(item as any, currentLang)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}