'use client'
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SectionBackground from './Bg';
const NotReadySection = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const text = "Not Ready Yet !";

  return (
    <SectionBackground>
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <motion.h1
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={headingVariants}
        className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 tracking-wide"
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            custom={index}
            variants={letterVariants}
            className="inline-block mx-0.5 bg-gradient-to-r from-blue-200 to-indigo-100 text-transparent bg-clip-text"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>


    </div>
    </SectionBackground>
  );
};

export default NotReadySection;