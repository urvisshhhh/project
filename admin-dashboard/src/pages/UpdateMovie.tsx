import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState({
    title: "",
    poster: "",
    genre: [] as string[],
    language: [] as string[],
    duration: "",
    rating: "",
    releaseDate: "",
    synopsis: "",
    trailer: "",
    cast: [] as { id: string; name: string; role: string; image: string }[],
  });

  const [newGenre, setNewGenre] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newCast, setNewCast] = useState({ id: "", name: "", role: "", image: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie", error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleAddGenre = () => {
    if (newGenre.trim()) {
      setMovie({ ...movie, genre: [...movie.genre, newGenre.trim()] });
      setNewGenre("");
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setMovie({ ...movie, language: [...movie.language, newLanguage.trim()] });
      setNewLanguage("");
    }
  };

  const handleRemoveGenre = (index: number) => {
    setMovie({ ...movie, genre: movie.genre.filter((_, i) => i !== index) });
  };

  const handleRemoveLanguage = (index: number) => {
    setMovie({ ...movie, language: movie.language.filter((_, i) => i !== index) });
  };

  const handleAddCast = () => {
    const { id, name, role, image } = newCast;
    if (id && name && role && image) {
      setMovie({ ...movie, cast: [...movie.cast, { ...newCast }] });
      setNewCast({ id: "", name: "", role: "", image: "" });
    }
  };

  const handleRemoveCast = (index: number) => {
    setMovie({ ...movie, cast: movie.cast.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/movies/${id}`, movie);
      navigate("/movies");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div className="container mx-auto mt-5 flex justify-center">
      <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg w-[500px] h-[800px]">
        <h1 className="text-3xl font-bold mb-4 text-center">Update Movie</h1>
        <form onSubmit={handleSubmit} className="max-h-[600px] overflow-y-auto p-3 space-y-4">
          {["title", "poster", "duration", "rating", "releaseDate", "trailer"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, " $1")}:</label>
              <input
                type={field === "releaseDate" ? "date" : "text"}
                name={field}
                value={(movie as any)[field]}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required={field !== "trailer"}
              />
            </div>
          ))}

          {/* Synopsis */}
          <div>
            <label className="block mb-1">Synopsis:</label>
            <textarea
              name="synopsis"
              value={movie.synopsis}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows={3}
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block mb-1">Genres:</label>
            <div className="flex mb-2">
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
            {movie.genre.map((g, i) => (
              <div key={i} className="flex justify-between bg-gray-700 p-2 mt-1 rounded">
                <span>{g}</span>
                <button type="button" onClick={() => handleRemoveGenre(i)} className="bg-red-500 px-2 py-1 rounded">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Language */}
          <div>
            <label className="block mb-1">Languages:</label>
            <div className="flex mb-2">
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
            {movie.language.map((l, i) => (
              <div key={i} className="flex justify-between bg-gray-700 p-2 mt-1 rounded">
                <span>{l}</span>
                <button type="button" onClick={() => handleRemoveLanguage(i)} className="bg-red-500 px-2 py-1 rounded">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cast */}
          <div>
            <label className="block mb-1">Cast:</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {["id", "name", "role", "image"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={(newCast as any)[field]}
                  onChange={(e) => setNewCast({ ...newCast, [field]: e.target.value })}
                  className="p-1 rounded bg-gray-700 text-white col-span-1"
                />
              ))}
            </div>
            <button type="button" onClick={handleAddCast} className="bg-blue-500 px-4 py-2 rounded mb-2">
              Add Cast Member
            </button>
            {movie.cast.map((c, i) => (
              <div key={i} className="flex justify-between bg-gray-700 p-2 mt-1 rounded">
                <span>{`${c.name} as ${c.role}`}</span>
                <button type="button" onClick={() => handleRemoveCast(i)} className="bg-red-500 px-2 py-1 rounded">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-green-500 px-4 py-2 rounded w-full">
            Update Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
