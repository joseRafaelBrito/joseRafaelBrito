import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { t, type Language } from "@/lib/i18n";

interface VideosSectionProps {
  currentLang: Language;
}

export function VideosSection({ currentLang }: VideosSectionProps) {
  const videos = [
    {
      title: "AI Automation Workflow",
      description: "Complete walkthrough of setting up automated workflows using OpenAI API and custom Python scripts.",
      embedId: "dQw4w9WgXcQ",
      duration: "12:34 minutes",
    },
    {
      title: "Modern Web Design Process",
      description: "From concept to deployment: Building responsive websites with React, Tailwind CSS, and modern tools.",
      embedId: "dQw4w9WgXcQ",
      duration: "18:45 minutes",
    },
    {
      title: "API Integration Masterclass",
      description: "Advanced techniques for integrating multiple APIs and handling complex data workflows in business applications.",
      embedId: "dQw4w9WgXcQ",
      duration: "25:12 minutes",
    },
    {
      title: "Database Optimization Tips",
      description: "Performance optimization strategies for large-scale applications and efficient database design patterns.",
      embedId: "dQw4w9WgXcQ",
      duration: "15:28 minutes",
    },
  ];

  return (
    <section id="videos" className="py-20 px-6 lg:px-12 bg-dark-surface">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("Tool Demonstrations", currentLang)}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              className="bg-dark-primary rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-t-xl" 
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={t(video.title as any, currentLang)}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t(video.title as any, currentLang)}
                </h3>
                <p className="text-gray-400 mb-4">
                  {t(video.description as any, currentLang)}
                </p>
                <div className="flex items-center text-sm text-blue-accent font-medium">
                  <Clock className="h-4 w-4 mr-2" />
                  {t(video.duration as any, currentLang)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
