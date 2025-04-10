import React, { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types";
import { useNavigate } from "react-router-dom";
import "../MovieList.css"; // Create a separate CSS file for styling similar to CinemaList

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/movies");
            setMovies(res.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/movies/${id}`);
            fetchMovies();
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    return (
        <div className="movie-container">
            <button onClick={() => navigate("/add-movie")} className="add-btn">➕ Add New Movie</button>
            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie._id} className="movie-card">
                        <img src={movie.poster} alt={movie.poster} />
                        <div className="movie-info">
                            <h3>{movie.title}</h3>
                            <p>📅 Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
                            <p>🎬 Genre: {movie.genre}</p>
                            <p>⭐ Rating: {movie.rating}</p>
                        </div>
                        <div className="movie-actions">
                            <button onClick={() => navigate(`/update-movie/${movie._id}`, { state: { movie } })}>✏️ Edit</button>
                            <button onClick={() => handleDelete(movie._id)} className="delete-btn">🗑️ Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
