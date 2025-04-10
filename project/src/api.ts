import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export const fetchMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addMovie = async (movie: any) => {
  const response = await axios.post(API_URL, movie);
  return response.data;
};
