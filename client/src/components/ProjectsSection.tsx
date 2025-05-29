import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { t, type Language } from "@/lib/i18n";

interface ProjectsSectionProps {
  currentLang: Language;
}

export function ProjectsSection({ currentLang }: ProjectsSectionProps) {
  const projects = [
    {
      title: "AI Process Automation",
      description: "Intelligent workflow automation system that reduced manual tasks by 80% for enterprise clients.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["Python", "TensorFlow", "API"],
      tagColors: ["bg-blue-accent", "bg-emerald-accent", "bg-purple-500"],
    },
    {
      title: "E-commerce Platform",
      description: "Modern, responsive e-commerce solution with AI-powered product recommendations and seamless checkout.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["React", "Node.js", "Stripe"],
      tagColors: ["bg-blue-accent", "bg-emerald-accent", "bg-yellow-500"],
    },
    {
      title: "AI Customer Support",
      description: "Intelligent chatbot system integrated with GPT-4 for 24/7 customer support with 95% accuracy rate.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["OpenAI API", "NLP", "Redis"],
      tagColors: ["bg-blue-accent", "bg-emerald-accent", "bg-red-500"],
    },
    {
      title: "Data Analytics Hub",
      description: "Real-time dashboard for business intelligence with predictive analytics and automated reporting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["D3.js", "Python", "MongoDB"],
      tagColors: ["bg-blue-accent", "bg-emerald-accent", "bg-orange-500"],
    },
    {
      title: "Mobile App Design",
      description: "Cross-platform mobile application with intuitive UI/UX design and seamless user experience.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["React Native", "TypeScript", "Expo"],
      tagColors: ["bg-blue-accent", "bg-emerald-accent", "bg-purple-500"],
    },
    {
      title: "Blockchain Platform",
      description: "Decentralized application with smart contract integration and cryptocurrency payment processing.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["Solidity", "Web3.js", "Ethereum"],
      tagColors: ["bg-blue-accent", "bg-emerald-accent", "bg-yellow-500"],
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("Featured Projects", currentLang)}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-dark-surface rounded-xl overflow-hidden shadow-lg group"
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
              <div className="relative overflow-hidden">
                <motion.img 
                  src={project.image}
                  alt={t(project.title as any, currentLang)}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t(project.title as any, currentLang)}
                </h3>
                <p className="text-gray-400 mb-4">
                  {t(project.description as any, currentLang)}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className={`${project.tagColors[tagIndex]} text-xs px-3 py-1 rounded-full text-white`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <motion.a 
                  href="#" 
                  className="text-blue-accent hover:underline font-medium flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {t("View Project →", currentLang)}
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
