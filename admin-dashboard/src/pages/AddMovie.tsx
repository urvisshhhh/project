import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMovie: React.FC = () => {
  const [movie, setMovie] = useState({
    _id: "",
    title: "",
    poster: "",
    genre: [] as string[], 
    language: [] as string[], 
    duration: "",
    rating: "",
    releaseDate: "",
  });

  const [newGenre, setNewGenre] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleAddGenre = () => {
    if (newGenre.trim() !== "") {
      setMovie({ ...movie, genre: [...movie.genre, newGenre] });
      setNewGenre("");
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() !== "") {
      setMovie({ ...movie, language: [...movie.language, newLanguage] });
      setNewLanguage("");
    }
  };

  const handleRemoveGenre = (index: number) => {
    setMovie({ ...movie, genre: movie.genre.filter((_, i) => i !== index) });
  };

  const handleRemoveLanguage = (index: number) => {
    setMovie({ ...movie, language: movie.language.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/movies", movie);
      navigate("/movies");
    } catch (error) {
      console.error("Error adding movie", error);
    }
  };

  return (
    <div className="container mx-auto mt-5 flex justify-center">
      <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg w-[400px] h-[600px]">
        <h1 className="text-3xl font-bold mb-4 text-center">Add Movie</h1>

        {/* SCROLLABLE FORM */}
        <form onSubmit={handleSubmit} className="max-h-[500px] overflow-y-auto p-3">
          <div className="mb-4">
            <label className="block mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Poster URL:</label>
            <input
              type="text"
              name="poster"
              value={movie.poster}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Duration (in minutes):</label>
            <input
              type="number"
              name="duration"
              value={movie.duration}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Rating:</label>
            <input
              type="number"
              name="rating"
              value={movie.rating}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
              min="0"
              max="10"
              step="0.1"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Release Date:</label>
            <input
              type="date"
              name="releaseDate"
              value={movie.releaseDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          {/* Genre Input */}
          <div className="mb-4">
            <label className="block mb-1">Genres:</label>
            <div className="flex">
              <input
                type="text"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white mr-2"
              />
              <button type="button" onClick={handleAddGenre} className="bg-blue-500 px-4 py-2 rounded">
                Add
              </button>
            </div>
            <div className="max-h-20 overflow-y-auto border border-gray-600 rounded mt-2 p-2">
              {movie.genre.map((g, index) => (
                <div key={index} className="flex justify-between bg-gray-700 p-2 mt-2 rounded">
                  <span>{g}</span>
                  <button type="button" onClick={() => handleRemoveGenre(index)} className="bg-red-500 px-2 py-1 rounded">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Language Input */}
          <div className="mb-4">
            <label className="block mb-1">Languages:</label>
            <div className="flex">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white mr-2"
              />
              <button type="button" onClick={handleAddLanguage} className="bg-blue-500 px-4 py-2 rounded">
                Add
              </button>
            </div>
            <div className="max-h-20 overflow-y-auto border border-gray-600 rounded mt-2 p-2">
              {movie.language.map((l, index) => (
                <div key={index} className="flex justify-between bg-gray-700 p-2 mt-2 rounded">
                  <span>{l}</span>
                  <button type="button" onClick={() => handleRemoveLanguage(index)} className="bg-red-500 px-2 py-1 rounded">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="bg-green-500 px-4 py-2 rounded w-full">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
