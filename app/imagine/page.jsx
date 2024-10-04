'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Loader, Eclipse, Star, Orbit, Calendar } from 'lucide-react';

const InputField = ({ label, name, value, onChange, icon: Icon }) => (
  <div className="mb-6">
    <label className="block text-xs font-medium mb-1 text-cyan-400">{label}</label>
    <div className="relative">
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label}`}
        className="w-full p-3 pl-10 bg-gray-900 border border-cyan-700 rounded-md text-cyan-100 placeholder-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
      />
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-600" size={18} />
    </div>
  </div>
);

const PlanetCard = ({ planet }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-gray-900 to-cyan-900 p-4 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
  >
    <h3 className="text-xl font-bold mb-2 text-cyan-300">{planet.pl_name}</h3>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="flex items-center"><Eclipse size={14} className="mr-2 text-cyan-500" /> Distance: {planet.distance}</div>
      <div className="flex items-center"><Star size={14} className="mr-2 text-cyan-500" /> Radius: {planet.radius}</div>
      <div className="flex items-center"><Orbit size={14} className="mr-2 text-cyan-500" /> Orbital Period: {planet["orbital period"]}</div>
    </div>
  </motion.div>
);

export default function FuturisticPlanetSearch() {
  const [formData, setFormData] = useState({
    disc_year: "",
    distance: "",
    radius: "",
    stars: "",
    orbital_period: "",
  });
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get("https://minimal-jessica-ziad-elkafoury-5a3fd4ee.koyeb.app/search/", {
        params: Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== "")),
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-100 flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Imagine a Planet
        </h1>
        <p className="text-xl text-cyan-400">Explore the mysteries of exoplanets</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-900 p-8 rounded-lg shadow-2xl shadow-cyan-500/20 mb-12"
      >
        <div className="grid grid-cols-2 gap-6">
          <InputField label="Discovery Year" name="disc_year" value={formData.disc_year} onChange={handleChange} icon={Calendar} />
          <InputField label="Distance" name="distance" value={formData.distance} onChange={handleChange} icon={Eclipse} />
          <InputField label="Radius" name="radius" value={formData.radius} onChange={handleChange} icon={Orbit} />
          <InputField label="Stars" name="stars" value={formData.stars} onChange={handleChange} icon={Star} />
        </div>
        <InputField label="Orbital Period" name="orbital_period" value={formData.orbital_period} onChange={handleChange} icon={Orbit} />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-md font-semibold transition-all duration-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="animate-spin" size={24} />
          ) : (
            <>
              <Search className="mr-2" size={20} />
              Explore
            </>
          )}
        </motion.button>
      </motion.form>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Search Results:</h2>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((planet, index) => (
              <PlanetCard key={index} planet={planet} />
            ))}
          </div>
        ) : (
          <p className="text-center text-cyan-500 text-lg">No exoplanets found. Adjust your search parameters to explore further!</p>
        )}
      </motion.div>
    </div>
  );
}