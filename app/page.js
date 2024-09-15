'use client'
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import FeaturesSection from "@/components/features";
import FloatingVideoPlayer from '@/components/intro';
import AnimatedQuoteSection from "@/components/qoute";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Home() {
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div variants={fadeInUp}>
          <Header />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <HeroSection videoSrc="/vid1.mp4" />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <FloatingVideoPlayer />
        </motion.div>
        
        <FeaturesSection />
        
        <motion.div variants={fadeInUp}>
          <AnimatedQuoteSection />
        </motion.div>
      </motion.div>
    </>
  );
}