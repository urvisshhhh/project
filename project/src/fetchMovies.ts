import { Movie } from "../types";

const MOVIE_STORAGE_KEY = "movies";

// Fetch movies from local storage
export const fetchMovies = (): Movie[] => {
  const movies = localStorage.getItem(MOVIE_STORAGE_KEY);
  return movies ? JSON.parse(movies) : [];
};

// Add a new movie and store it in local storage
export const addMovie = (movie: Movie) => {
  const movies = fetchMovies();
  movies.push({ ...movie, _id: String(new Date().getTime()) });
  localStorage.setItem(MOVIE_STORAGE_KEY, JSON.stringify(movies));
};
