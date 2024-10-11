'use client'
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link'

const QuoteSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

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
    <div ref={ref} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-center mb-12">
            <motion.div 
              variants={itemVariants}
              className="lg:w-1/2 flex justify-center mb-8 lg:mb-0"
            >
              <motion.img
                src="/quote.jpg"
                alt="Author Name"
                className="w-64 h-64 md:w-80 md:h-80 rounded-lg object-cover shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-white lg:w-1/2 text-center lg:text-left lg:pl-8">
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

            </motion.div>
          </div>
          
          <Link href="/levels">

          <motion.button
            variants={itemVariants}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Exoplanets
            <ChevronRight className="ml-2" size={20} />
          </motion.button>          
          </Link>

        </div>
      </motion.div>
    </div>
  );
};

export default QuoteSection;