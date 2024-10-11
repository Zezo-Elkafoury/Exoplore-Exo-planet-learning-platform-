'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const menuItems = [
  { title: 'Levels', href: '/levels' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Imagine Planet', href: '/imagine' }
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className={`relative bg-black top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <nav className={`mx-4 backdrop-blur-md bg-white/10 text-white rounded-full transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold py-2 cursor-pointer"
            >
              Exoplore
            </motion.div>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link key={item.title} href={item.href} passHref>
                <motion.a
                  className={`hover:text-indigo-300 transition-colors duration-200 ${
                    router.asPath === item.href ? 'text-indigo-300' : ''
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.title}
                </motion.a>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:block">
            <Link href="/levels" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition-colors duration-200"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-2"
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-indigo-900 bg-opacity-95 backdrop-blur-md mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="container mx-auto py-4 px-6">
              {menuItems.map((item) => (
                <Link key={item.title} href={item.href} passHref>
                  <motion.a
                    className={`block py-2 text-white hover:text-indigo-300 transition-colors duration-200 ${
                      router.asPath === item.href ? 'text-indigo-300' : ''
                    }`}
                    whileHover={{ x: 5 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </motion.a>
                </Link>
              ))}
              <Link href="/levels" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;