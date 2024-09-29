'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '@/data/levels.json';
import InteractiveBackground from '@/components/fullbg';

const LevelPage = ({params}) => {
  const { level } = params;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [levelData, setLevelData] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);

  useEffect(() => {
    if (level) {
      const levelInfo = data.find((l) => l.level === Number(level));
      setLevelData(levelInfo || null);
    }
  }, [level]);

  if (!levelData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const nextSlide = () => {
    if (currentSlide < levelData.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setQuizAnswer(null);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setQuizAnswer(null);
    }
  };

  const handleQuizAnswer = (answer) => {
    setQuizAnswer(answer);
  };

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'text':
          return (
            <motion.p 
              key={index} 
              className="text-lg mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {item.value}
            </motion.p>
          );
        case 'image':
          return (
            <motion.img 
              key={index}
              src={item.src} 
              alt={item.alt} 
              className="w-full h-auto mb-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            />
          );
        case 'video':
          return (
            <motion.video 
              key={index}
              src={item.src} 
              controls 
              className="w-full h-auto mb-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            />
          );
        case 'quiz':
          return (
            <motion.div 
              key={index} 
              className="mb-6 bg-gray-100 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">{item.question}</h3>
              {item.options.map((option, optionIndex) => (
                <motion.button
                  key={optionIndex}
                  onClick={() => handleQuizAnswer(optionIndex)}
                  className={`block w-full text-left p-3 mb-2 rounded transition-colors ${
                    quizAnswer === optionIndex
                      ? quizAnswer === item.correctAnswer
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                      : 'bg-white hover:bg-gray-200'
                  }`}
                  disabled={quizAnswer !== null}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
              <AnimatePresence>
                {quizAnswer !== null && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={quizAnswer === item.correctAnswer ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}
                  >
                    {quizAnswer === item.correctAnswer ? 'Correct! Well done!' : 'Incorrect. Try again!'}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <>
    <InteractiveBackground />
    <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-slate-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {levelData.title}
        </motion.h1>
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="p-8"
            >
              {renderContent(levelData.slides[currentSlide].content)}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-between">
          <motion.button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
          <motion.button
            onClick={nextSlide}
            disabled={currentSlide === levelData.slides.length - 1}
            className={`bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold ${currentSlide === levelData.slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
    </>

  );
};

export default LevelPage;