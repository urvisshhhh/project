import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types';
import { fetchMovies } from '../api'; // API function to fetch movies from the database

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [nowShowingMovies, setNowShowingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch movies from your API or database
    fetchMovies()
      .then((data) => {
        setMovies(data);

        // Filter upcoming movies (release date in the future)
        const upcoming = data.filter((movie: { releaseDate: string | number | Date; }) => new Date(movie.releaseDate) > new Date());
        setUpcomingMovies(upcoming);

        // Filter now showing movies (release date in the past or today)
        const nowShowing = data.filter((movie: { releaseDate: string | number | Date; }) => new Date(movie.releaseDate) <= new Date());
        setNowShowingMovies(nowShowing);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  return (
    <main>
      <HeroBanner />
      
      {/* Now Showing Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Now Showing</h2>
          <button className="text-gold hover:text-gold/80 transition">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nowShowingMovies.length > 0 ? (
            nowShowingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-white">No movies currently showing.</p>
          )}
        </div>
      </section>

      {/* Upcoming Movies Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Upcoming Movies</h2>
          <button className="text-gold hover:text-gold/80 transition">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingMovies.length > 0 ? (
            upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-white">No upcoming movies found.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
 