import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, Calendar, Play, MapPin } from 'lucide-react';
import YouTube from 'react-youtube';

const movie = {
  id: '1',
  title: 'Dune: Part Two',
  poster: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  backdrop: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
  genre: ['Sci-Fi', 'Adventure'],
  language: 'English',
  duration: '2h 46m',
  rating: '8.5/10',
  releaseDate: '2024-03-01',
  synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.',
  trailer: 'dQw4w9WgXcQ',
  cast: [
    {
      id: '1',
      name: 'Timothée Chalamet',
      role: 'Paul Atreides',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      name: 'Zendaya',
      role: 'Chani',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ],
  cinemas: [
    {
      id: '1',
      name: 'PVR Luxe',
      location: 'Downtown Mall',
      showtimes: [
        { id: '1', time: '10:30 AM', type: 'Standard' },
        { id: '2', time: '1:15 PM', type: 'Standard' },
        { id: '3', time: '4:00 PM', type: 'IMAX' },
        { id: '4', time: '7:30 PM', type: 'Dolby Atmos' },
      ]
    },
    {
      id: '2',
      name: 'PVR Premium',
      location: 'Central Square',
      showtimes: [
        { id: '5', time: '11:00 AM', type: 'Standard' },
        { id: '6', time: '2:30 PM', type: 'Standard' },
        { id: '7', time: '6:15 PM', type: 'Recliner' },
        { id: '8', time: '9:45 PM', type: 'Standard' },
      ]
    }
  ]
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleBookSeats = () => {
    navigate(`/movie/${id}/seats`);
  };

  return (
    <div className="pt-16">
      <div className="relative h-[60vh]">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-auto"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-gold" />
                  <span>{movie.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.releaseDate}</span>
                </div>
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 bg-gold/20 text-gold rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {movie.synopsis}
              </p>

              <div className="flex space-x-4 mb-8">
                <button 
                  className="bg-gold text-black px-8 py-3 rounded-md font-semibold hover:bg-gold/90 transition flex items-center space-x-2"
                  onClick={handleBookSeats}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Tickets</span>
                </button>
                <button className="bg-white/10 text-white px-8 py-3 rounded-md font-semibold hover:bg-white/20 transition flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Trailer</span>
                </button>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
                <div className="flex space-x-6">
                  {movie.cast?.map((member) => (
                    <div key={member.id} className="text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover mb-2"
                      />
                      <h4 className="text-white font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Trailer</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <YouTube
                    videoId={movie.trailer}
                    className="w-full h-full"
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: 0,
                      },
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Showtimes section */}
        <div className="mt-12 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Showtimes & Tickets</h2>
          
          <div className="space-y-6">
            {movie.cinemas.map((cinema) => (
              <div key={cinema.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{cinema.name}</h3>
                    <div className="flex items-center text-gray-400 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{cinema.location}</span>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="text-gold text-sm">Amenities: </span>
                    <span className="text-gray-400 text-sm">Dolby Atmos, IMAX, Food Court</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {cinema.showtimes.map((showtime) => (
                    <button
                      key={showtime.id}
                      onClick={handleBookSeats}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-medium">{showtime.time}</span>
                        <span className="text-xs text-gray-400">{showtime.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;