'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import exoplanets from '@/data/gallery.json'

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % exoplanets.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + exoplanets.length) % exoplanets.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-6xl">
        <div className={`relative ${isMobile ? 'aspect-[4/5]' : 'aspect-[16/9]'} overflow-hidden rounded-xl shadow-2xl`}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -1000 : 1000 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              <img
                src={exoplanets[currentIndex].image_url}
                alt={exoplanets[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className={`absolute ${isMobile ? 'top-0 bottom-auto p-4' : 'bottom-0 top-auto p-6'} left-0 right-0`}
                initial={{ y: isMobile ? -50 : 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: isMobile ? -50 : 50, opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{exoplanets[currentIndex].title}</h2>
                <p className="text-sm md:text-xl">{exoplanets[currentIndex].short_description}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {!isMobile && (
            <>
              <motion.div
                className="absolute top-0 left-0 bottom-0 w-1/3 cursor-pointer"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={handlePrev}
              />
              <motion.div
                className="absolute top-0 right-0 bottom-0 w-1/3 cursor-pointer"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={handleNext}
              />
            </>
          )}
        </div>
        
        <motion.div 
          className="mt-4 md:mt-8 flex justify-center space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {exoplanets.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-600'}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </motion.div>
      </div>
      
      {isMobile && (
        <div className="mt-6 w-full max-w-6xl">
          <div className="flex justify-between">
            <motion.button
              className="bg-white bg-opacity-10 px-4 py-2 rounded-full text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
            >
              Previous
            </motion.button>
            <motion.button
              className="bg-white bg-opacity-10 px-4 py-2 rounded-full text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
            >
              Next
            </motion.button>
          </div>
        </div>
      )}
      
   
    </div>
  );
};

export default Gallery;