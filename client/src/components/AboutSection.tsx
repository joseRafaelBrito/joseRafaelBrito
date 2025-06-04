import { motion } from "framer-motion";
import { t, type Language } from "@/lib/i18n";

interface AboutSectionProps {
  currentLang: Language;
}

export function AboutSection({ currentLang }: AboutSectionProps) {
  // Ripple animation component
  const RippleAnimation = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {[0, 0.5, 1].map((delay, index) => (
          <motion.div
            key={index}
            className={`absolute w-4 h-4 rounded-full ${
              index === 2 ? 'bg-emerald-accent' : 'bg-blue-accent'
            }`}
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-8px',
              marginTop: '-8px',
            }}
            animate={{
              scale: [0, 4],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 lg:px-12">
      {/* Ripple Animation Background */}
      <RippleAnimation />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1 
          className="text-4xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("Hi, I'm Jose Estevez", currentLang)}
        </motion.h1>
        
        <motion.p 
          className="text-lg lg:text-xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("An AI Automation Specialist dedicated to helping restaurants and real estate agencies save time, boost engagement, and grow their businesses using smart, scalable automation.", currentLang)}
        </motion.p>
        
        <motion.p 
          className="text-lg lg:text-xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t("I specialize in integrating AI-driven tools and workflow automation to eliminate repetitive tasks and free up time for what really matters — building relationships, closing deals, and delivering exceptional customer experiences.", currentLang)}
        </motion.p>
        
        <motion.p 
          className="text-lg lg:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {t("With a background in sales, digital systems, and content automation, I design end-to-end automated solutions that handle everything from social media posting to client follow-ups.", currentLang)}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            {t("View My Work", currentLang)}
          </motion.button>
          
          <motion.button 
            className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("Get In Touch", currentLang)}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
