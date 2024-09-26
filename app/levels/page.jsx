'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

const LevelsPage = () => {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const levels = [
    { name: "Level 1", path: "/level1", difficulty: 1 },
    { name: "Level 2", path: "/level2", difficulty: 2 },
    { name: "Level 3", path: "/level3", difficulty: 3 },
    { name: "Level 4", path: "/level4", difficulty: 4 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const generateStars = (difficulty) => {
    return [...Array(4)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < difficulty ? 'text-yellow-400' : 'text-gray-600'}
        fill={i < difficulty ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-600 to-stone-700 flex justify-center items-center p-8">
      <motion.div
        className="bg-black bg-opacity-50 rounded-3xl p-8 backdrop-blur-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-bold text-center text-white mb-8">Choose a level to start</h1>
        <div className="space-y-6">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredLevel(index)}
              onHoverEnd={() => setHoveredLevel(null)}
            >
              <Link href={level.path}>
                <div className='relative overflow-hidden rounded-xl cursor-pointer'>
                  <div className={`
                    bg-gradient-to-r from-indigo-800 to-purple-800 p-6 
                    shadow-[inset_0_0_20px_rgba(102,126,234,0.6)]
                    transition-all duration-300 ease-in-out
                  `}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{level.name}</h2>
                        <div className="flex space-x-1">
                          {generateStars(level.difficulty)}
                        </div>
                      </div>
                        <ChevronRight className="text-white" size={24} />
                    </div>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0"
                    initial={false}
                    animate={{ opacity: hoveredLevel === index ? 0.2 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LevelsPage;