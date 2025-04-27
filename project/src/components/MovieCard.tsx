import { Link, useNavigate } from 'react-router-dom';
import type { Movie } from '../types'; 
import { Clock, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'large';
}

const MovieCard = ({ movie, variant = 'default' }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/seats/${movie._id}`, {
        state: {
          movieTitle: movie.title,
          theatre: "PVR Luxe" // you can make it dynamic later
        }
      });
    } else {
      navigate('/login');
    }
  };

  const releaseDate = new Date(movie.releaseDate);
  const isFutureRelease = releaseDate > new Date();

  const cardClasses =
    variant === 'large'
      ? 'col-span-2 grid grid-cols-2 gap-6'
      : 'flex flex-col';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-lg bg-gray-900 transition-all hover:scale-[1.02] ${cardClasses}`}
    >
      <div className="block h-full">
        <div className={variant === 'large' ? 'h-full' : 'h-[400px]'}>
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 p-6 w-full">
            <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{movie.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{releaseDate.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 text-sm bg-yellow-400/20 text-yellow-300 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <Link
                to={`/movie/${movie._id}`}
                className="w-1/2 font-semibold py-3 text-center rounded-md bg-gray-300 text-black hover:bg-gray-400 transition"
              >
                View Details
              </Link>

              <button
                onClick={handleBookNow}
                className={`w-1/2 font-semibold py-3 rounded-md transition ${
                  isFutureRelease
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-yellow-400 text-black hover:bg-yellow-300'
                }`}
                disabled={isFutureRelease}
              >
                {isFutureRelease ? 'Coming Soon' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
