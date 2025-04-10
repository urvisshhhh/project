import axios from "axios";

const API_URL = "http://localhost:5000/api/movies"; // Backend URL

// ✅ Fetch all movies
export const fetchMovies = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};


// ✅ Fetch a single movie by ID
export const fetchMovieById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    throw error;
  }
};

// ✅ Add a new movie
export const addMovie = async (movie: any) => {
  try {
    const response = await axios.post(API_URL, movie);
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

// ✅ Update an existing movie
export const updateMovie = async (id: string, movieData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, movieData);
    return response.data;
  } catch (error) {
    console.error(`Error updating movie with ID ${id}:`, error);
    throw error;
  }
};

// ✅ Delete a movie
export const deleteMovie = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { message: "Movie deleted successfully" };
  } catch (error) {
    console.error(`Error deleting movie with ID ${id}:`, error);
    throw error;
  }
};
