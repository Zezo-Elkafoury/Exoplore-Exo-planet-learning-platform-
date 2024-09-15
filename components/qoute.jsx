'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedQuoteSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  return (
    <div ref={ref} className="relative min-h-screen w-full overflow-hidden">


      <div className="flex items-center justify-center p-4">
        <motion.div
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Text Content */}
            <motion.div 
              variants={itemVariants}
              className="lg:w-1/2 flex justify-center"
            >
              <motion.img
                src="/qoute.jpg"
                alt="Author Name"
                className="w-64 h-64 md:w-80 md:h-80 rounded-lg object-cover shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:w-1/2 mb-8 lg:mb-0 text-white">
              <motion.blockquote 
                className="text-3xl md:text-4xl font-serif italic mb-6"
                variants={itemVariants}
              >
                &quot;That&apos;s one small step for a man, one giant leap for mankind&quot;
              </motion.blockquote>
              <motion.p 
                className="text-xl mb-6"
                variants={itemVariants}
              >
                - Neil Alden Armstrong 
              </motion.p>
              <motion.p 
                className="text-lg"
                variants={itemVariants}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium 
              </motion.p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedQuoteSection;