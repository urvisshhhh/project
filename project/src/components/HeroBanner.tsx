import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // ✅ Import for navigation
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const featuredMovies = [
  {
    id: "1",
    title: "Pushpa 2 :the rule", 
    description:
      "The Rule is a 2024 Indian Telugu-language action drama film written and directed by Sukumar and produced by Mythri Movie Makers.",
    backdrop:
      "https://th.bing.com/th/id/OIP.-03Ie_ZKtwMtKGaIGT4DYAHaEK?w=301&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    trailerUrl: "https://www.youtube.com/watch?v=1kVK0MZlbI4&t=5s", // ✅ Avatar Trailer
  },
  {
    id: "2",
    title: "Chhaava",
    description:
      " chhava is a 2025 Indian Hindi-language historical action film, based on the life of Sambhaji Maharaj, the second ruler of the Maratha Empire, starring Vicky Kaushal, Rashmika Mandanna, and Akshaye Khanna.",
    backdrop:
      "data:image/jpeg;base64,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",
    trailerUrl: "https://www.youtube.com/watch?v=nsC5PhXS19Y", // ✅ Dune Trailer
  },
];

const HeroBanner = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  return (
    <div className="relative h-[85vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        navigation
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {featuredMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full">
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                  >
                    <h1 className="text-6xl font-bold text-white mb-4">
                      {movie.title}
                    </h1>
                    <p className="text-gray-300 text-xl mb-8">
                      {movie.description}
                    </p>
                    <div className="flex space-x-4">
                      {/* ✅ Watch Trailer Button */}
                      <a
                        href={movie.trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gold text-black px-8 py-3 rounded-md font-semibold hover:bg-gold/90 transition flex items-center space-x-2"
                      >
                        <Play className="w-5 h-5" />
                        <span>Watch Trailer</span>
                      </a>

                      {/* ✅ View Movie Details Button */}
                      
                    </div>
                  </motion.div>
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
