'use client'
import React from 'react';
import { motion } from 'framer-motion';

const MinimalistSpaceLoading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 z-50">
      <div className="relative w-40 h-40">
        <motion.div 
          className="absolute inset-0 border-2 border-blue-300 rounded-full opacity-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute inset-4 border border-purple-300 rounded-full opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full shadow-md"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ originX: '0.5', originY: '10' }}
        />
      </div>
      
      <motion.p 
        className="absolute bottom-10 text-white text-xl font-light tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        LOADING
      </motion.p>
    </div>
  );
};

export default MinimalistSpaceLoading;