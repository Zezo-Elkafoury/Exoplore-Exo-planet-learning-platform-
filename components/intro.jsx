'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import SectionBackground from './Bg';
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
      boxShadow: '0 0 20px rgba(138, 43, 226, 0.9)',
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
    <div className="min-h-screen relative flex flex-col items-center justify-center p-8">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative w-full max-w-4xl aspect-video"
      >
        <motion.div
          className="absolute inset-0 bg-stone-200 rounded-xl filter blur-xl"
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
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={togglePlay}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={toggleMute}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.button 
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-300 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:from-violet-700 hover:to-indigo-700"
          variants={buttonVariants}
          initial="hidden"
          animate={controls}
          whileHover="hover"
          whileTap="tap"
        >
          Begin Your Learning Journey
        </motion.button>
    </div>
  );
};

export default EnhancedVideoPlayer;