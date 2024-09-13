'use client'
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

const HeroSection = ({ videoSrc }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        damping: 12,
        stiffness: 100,
        delay: 0.5
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 0 15px rgba(138, 43, 226, 0.7)',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#070F2B] to-[#1A1B41]">
      <StarField />
      
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0 opacity-60"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-[#070F2B] via-transparent to-transparent z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-600"
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          Welcome To The World Of Exoplanets
        </motion.h1>

        <motion.button 
          className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:from-violet-700 hover:to-indigo-700"
          variants={buttonVariants}
          initial="hidden"
          animate={controls}
          whileHover="hover"
          whileTap="tap"
        >
          Begin Your Learning Journey
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;