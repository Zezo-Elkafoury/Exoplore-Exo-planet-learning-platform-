'use client'
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import SectionBackground from './Bg';

const features = [
  {
    title: "Feature 1",
    description: "Description for feature 1. This feature brings value to users by enhancing their experience and streamlining processes.",
    image: "/test.png"
  },
  {
    title: "Feature 2",
    description: "Description for feature 2. Our innovative approach sets us apart from competitors and provides unique benefits to our users.",
    image: "/test.png"
  },
  {
    title: "Feature 3",
    description: "Description for feature 3. This cutting-edge feature revolutionizes the way users interact with our product, setting new industry standards.",
    image: "/test.png"
  }
];


const FeatureBox = ({ title, description, image, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const xForward = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const xBackward = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]);

  const titleX = useMotionValue(50);
  const descriptionX = useMotionValue(-50);

  useEffect(() => {
    if (isInView) {
      titleX.set(0);
      descriptionX.set(0);
    } else {
      titleX.set(50);
      descriptionX.set(-50);
    }
  }, [isInView, titleX, descriptionX]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        x: index % 2 === 0 ? xForward : xBackward
      }}
      className="bg-white rounded-lg shadow-lg mb-16 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className={`md:w-1/2 p-6 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
        >
          <motion.h3 
            className="text-2xl font-bold mb-4"
            style={{ x: titleX }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-gray-600"
            style={{ x: descriptionX }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </motion.div>
        <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
};


const FeaturesSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const titleY = useMotionValue(50);
  const titleOpacity = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      titleY.set(0);
      titleOpacity.set(1);
    }
  }, [isInView, titleY, titleOpacity]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const titleYSpring = useSpring(titleY, springConfig);
  const titleOpacitySpring = useSpring(titleOpacity, springConfig);

  return (
    <SectionBackground>
      <div ref={containerRef} className="relative py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8  bg-gradient-to-r from-blue-200 to-indigo-100 text-transparent bg-clip-text"
            style={{ y: titleYSpring, opacity: titleOpacitySpring }}
          >
            Why We Stand Out
          </motion.h1>
          <div className="space-y-24">
            {features.map((feature, index) => (
              <FeatureBox key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionBackground>
  );
};

export default FeaturesSection;