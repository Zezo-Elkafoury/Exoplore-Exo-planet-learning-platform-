'use client'
import React, { useEffect, useState,useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Updated HeroSection
const HeroSection = ({ videoSrc }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        damping: 12,
        stiffness: 30,
        duration: 0.5,
      }
    }
  };

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden">
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

      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={controls}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-indigo-200 text-transparent bg-clip-text"
          variants={textVariants}
        >
          Welcome To The World Of Exoplanets
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-center text-blue-100"
          variants={textVariants}
        >
          Explore the mysteries of distant worlds
        </motion.p>
      </motion.div>
    </div>
  );
};

// Updated FeaturesSection with animated icons
const FeaturesSection = () => {
  const features = [
    {
      title: "Discover New Worlds",
      description: "Explore a vast database of exoplanets and their unique characteristics.",
      icon: "🌍"
    },
    {
      title: "Interactive 3D Models",
      description: "Visualize exoplanets and their star systems in stunning 3D.",
      icon: "🔭"
    },
    {
      title: "Real-time Updates",
      description: "Stay informed with the latest exoplanet discoveries and research.",
      icon: "📡"
    }
  ];

  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div 
      ref={containerRef} 
      className="relative py-16 bg-gradient-to-b from-[#070F2B] to-[#1A1B41]"
      style={{ opacity, scale }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 to-indigo-200 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore the Universe
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#1A1B41] p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div 
                className="text-4xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-blue-300">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Updated AnimatedQuoteSection
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
    <div ref={ref} className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#1A1B41] to-[#070F2B] py-16">
      <div className="flex items-center justify-center p-4">
        <motion.div
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              variants={itemVariants}
              className="lg:w-1/2 flex justify-center mb-8 lg:mb-0"
            >
              <motion.img
                src="/qoute.jpg"
                alt="Author Name"
                className="w-64 h-64 md:w-80 md:h-80 rounded-lg object-cover shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:w-1/2 text-white">
              <motion.blockquote 
                className="text-3xl md:text-4xl font-serif italic mb-6 text-blue-200"
                variants={itemVariants}
              >
                "That's one small step for a man, one giant leap for mankind"
              </motion.blockquote>
              <motion.p 
                className="text-xl mb-6 text-indigo-200"
                variants={itemVariants}
              >
                - Neil Alden Armstrong 
              </motion.p>
              <motion.p 
                className="text-lg text-gray-300"
                variants={itemVariants}
              >
                As we explore exoplanets, we continue to push the boundaries of human knowledge and imagination.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Updated EnhancedVideoPlayer
const EnhancedVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, easing: 'cubic-bezier(0.6, 0.05, 0.01, 0.9)'  },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 0.7, 0.5],
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
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
        duration: 0.5 
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 0 20px rgba(66, 153, 225, 0.9)', // Updated to blue
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative w-full max-w-4xl mx-auto aspect-video"
    >
      <motion.div
        className="absolute inset-0 bg-blue-900 rounded-xl filter blur-xl"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      ></motion.div>
      <div className="relative rounded-xl overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/vid1.mp4"
          loop
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={togglePlay}
            className="bg-blue-500/20 backdrop-blur-sm text-white p-2 rounded-full"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={toggleMute}
            className="bg-blue-500/20 backdrop-blur-sm text-white p-2 rounded-full"
          >
            {isMuted ? "🔇" : "🔊"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// New CustomCursor component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed w-6 h-6 rounded-full bg-blue-400 pointer-events-none z-50 mix-blend-difference"
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
};

// New FloatingElements component
const FloatingElement = ({ delay }) => {
  return (
    <motion.div
      className="absolute w-4 h-4 rounded-full bg-blue-400 opacity-50"
      initial={{ x: '-100%', y: Math.random() * 100 + '%' }}
      animate={{
        x: '200%',
        y: Math.random() * 100 + '%',
        rotate: 360,
      }}
      transition={{
        duration: Math.random() * 20 + 20,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(10)].map((_, i) => (
        <FloatingElement key={i} delay={i * 2} />
      ))}
    </div>
  );
};

// Main CombinedExoplanetPage component
const CombinedExoplanetPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="relative min-h-screen bg-[#070F2B] text-white overflow-hidden">
      <CustomCursor />
      <FloatingElements />
      
      <motion.div style={{ y }} className="absolute inset-0 bg-[url('/stars.jpg')] bg-cover opacity-50" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <HeroSection videoSrc="/space-video.mp4" />
        <FeaturesSection />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="container mx-auto px-4 py-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 to-indigo-200 text-transparent bg-clip-text">
            Explore Exoplanets
          </h2>
          <EnhancedVideoPlayer />
        </motion.div>
        
        <AnimatedQuoteSection />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="py-16 bg-gradient-to-b from-[#070F2B] to-[#1A1B41]"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 to-indigo-200 text-transparent bg-clip-text">
              Latest Discoveries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1A1B41] rounded-lg overflow-hidden shadow-lg"
                >
                  <img src={`/exoplanet-${index + 1}.jpg`} alt={`Exoplanet ${index + 1}`} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">Exoplanet XYZ-{index + 1}</h3>
                    <p className="text-gray-300">A newly discovered exoplanet with unique characteristics...</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="py-16 bg-gradient-to-b from-[#1A1B41] to-[#070F2B]"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 to-indigo-200 text-transparent bg-clip-text">
              Join Our Community
            </h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-md bg-[#070F2B] text-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Subscribe to Newsletter
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <footer className="relative z-10 bg-[#070F2B] py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 Exoplanet Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CombinedExoplanetPage;