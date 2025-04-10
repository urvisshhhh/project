import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cinema } from "../types/Cinema";
import { useNavigate } from "react-router-dom";
import "../CinemaList.css";

const CinemaList: React.FC = () => {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const navigate = useNavigate();

    // Fetch all cinemas
    const fetchCinemas = async () => {
        try {
            const res = await axios.get("http://localhost:5000/cinemas");
            setCinemas(res.data);
        } catch (error) {
            console.error("Error fetching cinemas:", error);
        }
    };

    useEffect(() => {
        fetchCinemas();
    }, []);

    // Handle delete cinema
    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this cinema?")) return;
        try {
            await axios.delete(`http://localhost:5000/cinemas/${id}`);
            fetchCinemas();
        } catch (error) {
            console.error("Error deleting cinema:", error);
        }
    };

    return (
        <div className="cinema-container">
            <button onClick={() => navigate("/cinemas/add")} className="add-btn">➕ Add New Cinema</button>
            <div className="cinema-list">
                {cinemas.map((cinema) => (
                    <div key={cinema._id} className="cinema-card">
                        <img src={cinema.image} alt={cinema.name} />
                        <div className="cinema-info">
                            <h3>{cinema.name}</h3>
                            <p>📍 {cinema.location}, {cinema.city}</p>
                            <p>⭐ Rating: {cinema.rating}</p>
                            <p>🎭 Amenities: {cinema.amenities}</p>
                        </div>
                        <div className="cinema-actions">
                            <button onClick={() => navigate(`/cinemas/edit/${cinema._id}`, { state: { cinema } })}>✏️ Edit</button>
                            <button onClick={() => handleDelete(cinema._id)} className="delete-btn">🗑️ Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CinemaList;
