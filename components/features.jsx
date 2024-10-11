'use client'
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    title: "Well-Divided Content",
    description: "We break down complex concepts into smaller, interconnected parts, making them easier to understand and explore in depth.",
    image: "/features/content.png",
    link: "/levels"
  },
  {
    title: "Exoplanets Gallery",
    description: "Explore our curated collection of visual content that brings abstract concepts to life, enhancing your learning experience.",
    image: "/features/gallery.png",
    link: "/gallery"
  },
  {
    title: "Imagine a planet",
    description: "Input details for your own imaginary planet, and our tool will find the most similar real planet, sparking curiosity and discovery.",
    image: "/features/imagine.png",
    link: "/imagine"
  }
];

const FeatureBox = ({ title, description, image, link, index }) => {
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
  const buttonY = useMotionValue(20);
  const buttonOpacity = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      titleX.set(0);
      descriptionX.set(0);
      buttonY.set(0);
      buttonOpacity.set(1);
    } else {
      titleX.set(50);
      descriptionX.set(-50);
      buttonY.set(20);
      buttonOpacity.set(0);
    }
  }, [isInView, titleX, descriptionX, buttonY, buttonOpacity]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        x: index % 2 === 0 ? xForward : xBackward
      }}
      className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg shadow-lg mb-16 overflow-hidden transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col lg:flex-row">
        <motion.div 
          className={`lg:w-1/2 p-8 flex flex-col justify-between ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div>
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-4 text-blue-700"
              style={{ x: titleX }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="text-slate-700 mb-6"
              style={{ x: descriptionX }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            >
              {description}
            </motion.p>
          </div>
          <motion.div
            style={{ y: buttonY, opacity: buttonOpacity }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <Link href={link} passHref>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg group flex items-center">
                Explore Now
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
        <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative w-full h-0 pb-[75%] lg:pb-[56.25%]">
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const containerRef = useRef(null);
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
    <div ref={containerRef} className="relative py-16 md:py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-slate-300 to-indigo-300 text-transparent bg-clip-text"
          style={{ y: titleYSpring, opacity: titleOpacitySpring }}
        >
          Why We Stand Out
        </motion.h2>
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <FeatureBox key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;