import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Cinema {
  name: string;
  location: string;
  city: string;
  rating: number;
  amenities: string;
  image: string;
}

const CinemaForm: React.FC = () => {
  const [form, setForm] = useState<Cinema>({
    name: "",
    location: "",
    city: "",
    rating: 0,
    amenities: "",
    image: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/cinemas", form);
      setSuccessMessage("Cinema added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setForm({ name: "", location: "", city: "", rating: 0, amenities: "", image: "" });
      navigate("/cinemas");
    } catch (error) {
      console.error("Error adding cinema:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6 overflow-y-auto">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Add New Cinema</h2>

        {successMessage && <p className="text-green-400 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Cinema Name"
            value={form.name}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-10)"
            value={form.rating}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma separated)"
            value={form.amenities}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/cinemas")}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              ➕ Add Cinema
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CinemaForm;
