'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const factors = [
  { id: 'temperature', name: 'Temperature (°C)', min: -50, max: 100, ideal: { min: 15, max: 25 }, weight: 0.25 },
  { id: 'pressure', name: 'Atmospheric Pressure (atm)', min: 0, max: 2, ideal: { min: 0.8, max: 1.2 }, weight: 0.2 },
  { id: 'distance', name: 'Distance from Star (AU)', min: 0.5, max: 2, ideal: { min: 0.95, max: 1.05 }, weight: 0.15 },
  { id: 'gravity', name: 'Surface Gravity (g)', min: 0, max: 2, ideal: { min: 0.8, max: 1.2 }, weight: 0.15 },
];

const CustomSlider = ({ factor, value, onChange }) => {
  const percentage = ((value - factor.min) / (factor.max - factor.min)) * 100;

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-medium mb-1 text-gray-300">{factor.name}: {value}</label>
      <div className="relative h-6 bg-gray-700 rounded-full">
        <motion.div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{ width: `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        ></motion.div>
        <input
          type="range"
          min={factor.min}
          max={factor.max}
          step={(factor.max - factor.min) / 100}
          value={value}
          onChange={(e) => onChange(factor.id, parseFloat(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

const HabitabilityScoreCalculator = () => {
  const [values, setValues] = useState(
    factors.reduce((acc, factor) => ({ ...acc, [factor.id]: (factor.max + factor.min) / 2 }), {})
  );
  const [score, setScore] = useState(0);
  const [contributions, setContributions] = useState([]);
  const [feedback, setFeedback] = useState({});

  const normalizeValue = (value, factor) => {
    const { min, max, ideal } = factor;
    if (value >= ideal.min && value <= ideal.max) {
      return 1;
    } else if (value < ideal.min) {
      return Math.max(0, 1 - (ideal.min - value) / (ideal.min - min));
    } else {
      return Math.max(0, 1 - (value - ideal.max) / (max - ideal.max));
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    const newContributions = [];
    const newFeedback = {};

    factors.forEach(factor => {
      const value = values[factor.id];
      const normalizedValue = normalizeValue(value, factor);
      const contributionScore = normalizedValue * factor.weight;
      totalScore += contributionScore;

      newContributions.push({
        name: factor.name,
        value: (contributionScore / totalScore) * 100
      });

      newFeedback[factor.id] = generateFeedback(value, factor.ideal.min, factor.ideal.max);
    });

    setScore(totalScore);
    setContributions(newContributions);
    setFeedback(newFeedback);
  };

  useEffect(() => {
    calculateScore();
  }, [values]);

  const handleChange = (id, value) => {
    setValues(prevValues => ({ ...prevValues, [id]: value }));
  };

  const generateFeedback = (value, idealMin, idealMax) => {
    if (value < idealMin) {
      return `Consider increasing this value for better habitability.`;
    } else if (value > idealMax) {
      return `Consider decreasing this value for better habitability.`;
    } else {
      return `This value is within an ideal range for habitability.`;
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-4xl">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-blue-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Exoplanet Habitability Calculator
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Planetary Factors</h2>
            {factors.map(factor => (
              <CustomSlider
                key={factor.id}
                factor={factor}
                value={values[factor.id]}
                onChange={handleChange}
              />
            ))}
          </motion.div>

          <motion.div 
            className="bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Habitability Analysis</h2>
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-blue-200">Habitability Score</h3>
              <motion.div 
                className="text-4xl font-bold text-green-400"
                key={score}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {(score * 100).toFixed(2)}%
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-200">Factor Contributions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contributions} layout="vertical">
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="value" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Habitability Feedback</h2>
          <div className="space-y-2 text-gray-300">
            {factors.map(factor => (
              <p key={factor.id}><strong>{factor.name}:</strong> {feedback[factor.id]}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HabitabilityScoreCalculator;