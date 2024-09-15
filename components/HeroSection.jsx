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

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block">
      <span className="relative z-10 text-blue-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
        {text}
      </span>
      <span className="absolute top-0 left-0 z-0 text-blue-300 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold opacity-70 blur-[2px] animate-pulse">
        {text}
      </span>
      <span className="absolute -top-[2px] -left-[2px] z-0 text-red-300 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold opacity-70 blur-[2px] animate-pulse" style={{ animationDelay: '0.1s' }}>
        {text}
      </span>
    </div>
  );
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: '100vh' },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        damping: 12,
        stiffness: 30,
        duration: .5,
      }
    }
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

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10"></div>

      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h1 
          className="text-center mb-8"
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-blue-50 to-indigo-100 text-transparent bg-clip-text">
            Welcome To The World Of
          </span>
          <br />
          <GlitchText text="Exoplanets" />
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default HeroSection;