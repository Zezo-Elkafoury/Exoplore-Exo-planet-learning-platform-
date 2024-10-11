'use client'
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link'
const NotFound = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {stars.map((star, index) => (
        <Star
          key={index}
          size={star.size}
          className="text-white absolute animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-blue-300 mb-8">It seems that we have a problem!</p>
        <div className="space-y-4">
          <p className="text-xl text-gray-300">Maybe This page is not here yet.</p>
          <p className="text-xl text-gray-300">We're trying our best to make it soon!</p>
        </div>
        <div className="mt-12">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="0.2"
            d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default NotFound;