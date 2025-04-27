import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Movie Type Definition with releaseDate
interface Movie {
  _id: string;
  title: string;
  synopsis: string;
  poster: string;
  trailer: string;
  releaseDate: string; // Assuming the releaseDate is in ISO 8601 format (e.g., "2025-05-01T00:00:00Z")
}

const HeroBanner: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/movies"); // Make sure `/api/movies` route matches your server
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await res.json();

        // Filter movies with a future release date
        const futureMovies = data.filter((movie: Movie) => new Date(movie.releaseDate) > new Date());
        setMovies(futureMovies);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handlePlayTrailer = (trailerUrl: string) => {
    window.open(trailerUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-black text-white text-2xl">
        Loading upcoming movies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-black text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        loop
        navigation
        autoplay={{ delay: 4000 }}
        className="w-full h-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${movie.poster})` }}
            >
              <div className="bg-black/60 w-full h-full flex flex-col justify-center items-start px-10">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-white text-5xl font-bold mb-4"
                >
                  {movie.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white text-lg max-w-2xl mb-6"
                >
                  {movie.synopsis}
                </motion.p>
                <div className="flex gap-4">
                  <a
                    href={movie.trailer.startsWith("http") ? movie.trailer : `https://${movie.trailer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Watch Trailer
                  </a>

                  <button
                    onClick={() => navigate(`/movie/${movie._id}`)}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                  >
                    <Info size={20} />
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
