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
          className="text-5xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("Building the Future with AI", currentLang)}
        </motion.h1>
        
        <motion.p 
          className="text-xl lg:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("I create intelligent automation solutions and stunning web experiences that transform businesses and enhance user interactions.", currentLang)}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            className="bg-blue-accent hover:bg-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)" }}
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
