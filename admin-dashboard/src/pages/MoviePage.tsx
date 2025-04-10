import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash, Plus, Edit } from "lucide-react";

interface Movie {
  _id: string;
  title: string;
  poster: string;
  duration: string;
  rating: string;
  releaseDate: string;
}

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<Movie>({
    _id: "",
    title: "",
    poster: "",
    duration: "",
    rating: "",
    releaseDate: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMovieId, setEditingMovieId] = useState<string | null>(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get<Movie[]>("http://localhost:5000/movies");
      setMovies(response.data);
    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateMovie = async () => {
    if (!newMovie.title || !newMovie.poster) return;

    try {
      if (editingMovieId) {
        // Update existing movie
        const response = await axios.put(`http://localhost:5000/movies/${editingMovieId}`, newMovie);
        setMovies(movies.map((movie) => (movie._id === editingMovieId ? response.data : movie)));
        setEditingMovieId(null);
      } else {
        // Add new movie
        const response = await axios.post("http://localhost:5000/movies", newMovie);
        setMovies([...movies, response.data]);
      }

      setNewMovie({ _id: "", title: "", poster: "", duration: "", rating: "", releaseDate: "" });
    } catch (err) {
      console.error("Error saving movie");
    }
  };

  const handleEditMovie = (movie: Movie) => {
    setNewMovie(movie);
    setEditingMovieId(movie._id);
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`);
      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (err) {
      console.error("Error deleting movie");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Movie Management</h1>

      {/* Add / Update Movie Form */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">{editingMovieId ? "Update Movie" : "Add a Movie"}</h2>
        <input type="text" placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} className="w-full mb-2 p-2 rounded" />
        <input type="text" placeholder="Poster URL" value={newMovie.poster} onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })} className="w-full mb-2 p-2 rounded" />
        <input type="text" placeholder="Duration" value={newMovie.duration} onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })} className="w-full mb-2 p-2 rounded" />
        <input type="text" placeholder="Rating" value={newMovie.rating} onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })} className="w-full mb-2 p-2 rounded" />
        <input type="date" value={newMovie.releaseDate} onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })} className="w-full mb-2 p-2 rounded" />
        <button onClick={handleAddOrUpdateMovie} className="w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center">
          {editingMovieId ? <Edit className="mr-2" /> : <Plus className="mr-2" />}
          {editingMovieId ? "Update Movie" : "Add Movie"}
        </button>
      </div>

      {/* Movie List */}
      {loading ? (
        <p className="text-white">Loading movies...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid gap-4">
          {movies.map((movie) => (
            <motion.div key={movie._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={movie.poster} alt={movie.title} className="w-20 h-28 object-cover rounded" />
                <div>
                  <h3 className="text-xl text-white font-semibold">{movie.title}</h3>
                  <p className="text-gray-400">Duration: {movie.duration} min | Rating: {movie.rating}</p>
                  <p className="text-gray-400">Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEditMovie(movie)} className="text-yellow-500"><Edit /></button>
                <button onClick={() => handleDeleteMovie(movie._id)} className="text-red-500"><Trash /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviePage;
