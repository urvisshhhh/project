import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Cinema {
  _id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  amenities: string;
  image: string;
}

const EditCinema: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [form, setForm] = useState<Cinema | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("❌ Invalid Cinema ID.");
      return;
    }

    const fetchCinema = async () => {
      try {
        console.log(`Fetching cinema details for ID: ${id}`);
        const res = await axios.get(`http://localhost:5000/api/cinemas/${id}`);

        if (res.data) {
          setForm(res.data);
          setMessage(""); 
          setError("");
        } else {
          setError("❌ Cinema not found.");
        }
      } catch (error) {
        console.error("Error fetching cinema:", error);
        setError("❌ Failed to load cinema details.");
      }
    };

    fetchCinema();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) =>
      prevForm ? { ...prevForm, [e.target.name]: e.target.value } : null
    );
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    // Prevent updating empty fields
    if (!form.name || !form.location || !form.city || !form.amenities || !form.image) {
      setError("❌ All fields are required!");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/cinemas/${id}`, form, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("✅ Cinema updated successfully!");
      setError("");
      setTimeout(() => navigate("/cinemas"), 2000);
    } catch (error) {
      console.error("Error updating cinema:", error);
      setError("❌ Failed to update cinema. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cinemas/${id}`);
      navigate("/cinemas");
    } catch (error) {
      console.error("Error deleting cinema:", error);
      setError("❌ Failed to delete cinema.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Edit Cinema</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {message && <p className="text-green-400 text-center mb-4">{message}</p>}

        {form ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              name="rating"
              value={form.rating}
              onChange={(e) =>
                setForm((prevForm) =>
                  prevForm ? { ...prevForm, rating: Number(e.target.value) } : null
                )
              }
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                🗑 Delete
              </button>
              <div className="flex gap-3">
                <button type="button" onClick={() => navigate("/cinemas")} className="px-4 py-2 text-gray-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  💾 Update
                </button>
              </div>
            </div>
          </form>
        ) : (
          <p className="text-white text-center">Loading cinema details...</p>
        )}
      </div>
    </div>
  );
};

export default EditCinema;
