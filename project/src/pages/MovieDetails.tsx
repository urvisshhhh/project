import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, Calendar, Play } from 'lucide-react';

interface Cast {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface Movie {
  _id: string;
  title: string;
  poster: string;
  genre: string[];
  language: string[];
  duration: string;
  rating: string;
  releaseDate: string;
  synopsis: string;
  trailer: string;  // This should be the external YouTube link
  cast: Cast[];
}

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/movies/${id}`);
        if (!res.ok) throw new Error('Movie not found');
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleBookSeats = () => {
    navigate(`/movie/${id}/seats`);
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!movie) return <div className="text-red-500 text-center mt-20">Movie not found.</div>;

  // Extract YouTube Video ID from trailer URL
  const youtubeVideoId = movie.trailer.split('v=')[1]?.split('&')[0];

  return (
    <div className="pt-16">
      <div className="relative h-[60vh]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <img src={movie.poster} alt={movie.title} className="rounded-lg w-full h-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h1 className="text-4xl font-bold text-white">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{movie.duration}</span></div>
              <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /><span>{movie.rating}</span></div>
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{movie.releaseDate}</span></div>
              {movie.genre.map((g) => (
                <span key={g} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">{g}</span>
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">{movie.synopsis}</p>

            <div className="flex gap-4">
              <button
                onClick={handleBookSeats}
                className="bg-yellow-400 text-black px-8 py-3 rounded-md font-semibold hover:bg-yellow-300 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Tickets
              </button>

              <a
                href={`https://${movie.trailer}`}  // Prepend "https://" to the trailer path if needed
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white px-8 py-3 rounded-md font-semibold hover:bg-white/20 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Trailer
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
              <div className="flex space-x-6 overflow-x-auto pb-2">
                {movie.cast.map((actor) => (
                  <div key={actor.id} className="text-center min-w-[100px]">
                    <img src={actor.image} alt={actor.name} className="w-20 h-20 rounded-full object-cover mb-2" />
                    <h4 className="text-white font-medium">{actor.name}</h4>
                    <p className="text-sm text-gray-400">{actor.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Embed YouTube Trailer */}
            {youtubeVideoId && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Watch Trailer</h3>
                <iframe
                  width="100%"
                  height="480"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Trailer"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
