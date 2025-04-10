import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import axios from 'axios';

const Cinemas = () => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cinemas`);
        setCinemas(response.data);
      } catch (err) {
        setError('Failed to load cinemas');
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  return (
    <div className="pt-16">
      <div className="relative h-[40vh]">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
          alt="Cinemas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Our Cinemas</h1>
              <p className="text-xl text-gray-300">
                Explore all available cinemas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cinemas.map((cinema) => (
              <motion.div
                key={cinema._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={cinema.image}
                    alt={cinema.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 text-gold" />
                    <span className="text-white">{cinema.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{cinema.name}</h3>
                  <div className="flex items-center text-gray-300 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{cinema.location}, {cinema.city}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cinema.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-gold text-black font-semibold py-3 rounded-md hover:bg-gold/90 transition">
                    View Showtimes
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cinemas;
