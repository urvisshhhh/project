import React, { useState, useEffect } from 'react';
import { Filter, Search, X } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { fetchMovies } from '../api'; // API function to fetch movies

const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi'];
const languages = ['English', 'Hindi', 'Gujarati', 'Tamil'];

const UpcomingMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMovies()
      .then((data) => {
        console.log('Fetched Movies:', data);
        setMovies(data);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
    );
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSearchQuery('');
  };

  const filteredMovies = movies.filter((movie) => {
    const movieDate = new Date(movie.releaseDate);
    const today = new Date();

    return (
      movieDate >= today && // Only show upcoming movies
      (selectedGenres.length === 0 ||
        movie.genre.some((g: string) =>
          selectedGenres.some((selected) => g.toLowerCase() === selected.toLowerCase())
        )) &&
      (selectedLanguages.length === 0 ||
        selectedLanguages.some((selected) =>
          movie.language.some((lang: string) => lang.toLowerCase() === selected.toLowerCase())
        )) &&
      (searchQuery === '' || movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-white">Upcoming Movies</h1>
        </div>

        <div className="mb-6 flex items-center bg-gray-800 rounded-lg p-3 relative">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search upcoming movies..."
            className="w-full bg-transparent text-white ml-2 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Genre</h3>
              <div className="space-y-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`w-full text-left px-3 py-2 rounded ${selectedGenres.includes(genre) ? 'bg-gold text-black' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
              <div className="space-y-2">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => toggleLanguage(language)}
                    className={`w-full text-left px-3 py-2 rounded ${selectedLanguages.includes(language) ? 'bg-gold text-black' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            ) : (
              <p className="text-white text-center">No upcoming movies found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMovies;
