// app/search.js or pages/search.js
"use client";
import { useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [formData, setFormData] = useState({
    disc_year: "",
    distance: "",
    radius: "",
    stars: "",
    orbital_period: "",
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://minimal-jessica-ziad-elkafoury-5a3fd4ee.koyeb.app/search/", {
        params: {
          disc_year: formData.disc_year || undefined,
          distance: formData.distance || undefined,
          radius: formData.radius || undefined,
          stars: formData.stars || undefined,
          orbital_period: formData.orbital_period || undefined,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Search for Planets</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Discovery Year</label>
          <input
            type="number"
            name="disc_year"
            value={formData.disc_year}
            onChange={handleChange}
            placeholder="Enter Discovery Year"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Distance</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            placeholder="Enter Distance"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Radius</label>
          <input
            type="number"
            name="radius"
            value={formData.radius}
            onChange={handleChange}
            placeholder="Enter Radius"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Stars</label>
          <input
            type="number"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            placeholder="Enter Number of Stars"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Orbital Period</label>
          <input
            type="number"
            name="orbital_period"
            value={formData.orbital_period}
            onChange={handleChange}
            placeholder="Enter Orbital Period"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Search
        </button>
      </form>

      <div className="mt-8 w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Search Results:</h2>
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((planet, index) => (
              <li
                key={index}
                className="p-4 bg-gray-700 rounded-lg shadow-md text-white"
              >
                <span className="font-bold">{planet.pl_name}</span>: Distance = {" "}
                {planet.distance}, Radius = {planet.radius}, Orbital Period = {" "}
                {planet["orbital period"]}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No results found.</p>
        )}
      </div>
    </div>
  );
}
