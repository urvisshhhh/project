import { useState, useEffect } from 'react';
import axios from 'axios';

// Interfaces
interface Movie {
  _id: string;
  title: string;
}

interface Cinema {
  _id: string;
  name: string;
  showtimes: Showtime[];
}

interface Showtime {
  _id: string;
  time: string;
  type: string;
}

const ShowtimeManager = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [newShowtime, setNewShowtime] = useState<{ time: string; type: string }>({ time: '', type: '' });

  // Fetch movies and cinemas on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const movieResponse = await axios.get('/api/movies');
        setMovies(movieResponse.data);

        const cinemaResponse = await axios.get('/api/cinemas');
        setCinemas(cinemaResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // Fetch showtimes for the selected movie and cinema
  const fetchShowtimes = async () => {
    if (selectedMovie && selectedCinema) {
      try {
        const response = await axios.get(`/api/cinemas/${selectedCinema}/movies/${selectedMovie}/showtimes`);
        setShowtimes(response.data);
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    }
  };

  useEffect(() => {
    fetchShowtimes();
  }, [selectedMovie, selectedCinema]);

  // Handle the addition of a new showtime
  const handleAddShowtime = async () => {
    if (!newShowtime.time || !newShowtime.type) {
      alert('Please fill in all fields');
      return;
    }

    const newShowtimeData = {
      time: newShowtime.time,
      type: newShowtime.type,
    };

    try {
      await axios.post(`/api/cinemas/${selectedCinema}/movies/${selectedMovie}/showtimes`, newShowtimeData);
      fetchShowtimes(); // Refresh showtimes list
      setNewShowtime({ time: '', type: '' }); // Reset form fields
    } catch (error) {
      console.error('Error adding showtime:', error);
    }
  };

  // Handle deletion of a showtime
  const handleDeleteShowtime = async (showtimeId: string) => {
    try {
      await axios.delete(`/api/cinemas/${selectedCinema}/movies/${selectedMovie}/showtimes/${showtimeId}`);
      fetchShowtimes(); // Refresh showtimes list
    } catch (error) {
      console.error('Error deleting showtime:', error);
    }
  };

  return (
    <div>
      <h1>Manage Movie Showtimes</h1>

      {/* Select Movie */}
      <div>
        <label>Select Movie:</label>
        <select onChange={(e) => setSelectedMovie(e.target.value)} value={selectedMovie || ''}>
          <option value="">--Select Movie--</option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
      </div>

      {/* Select Cinema */}
      <div>
        <label>Select Cinema:</label>
        <select onChange={(e) => setSelectedCinema(e.target.value)} value={selectedCinema || ''}>
          <option value="">--Select Cinema--</option>
          {cinemas.map((cinema) => (
            <option key={cinema._id} value={cinema._id}>
              {cinema.name}
            </option>
          ))}
        </select>
      </div>

      {/* Showtimes Table */}
      <div>
        <h3>Showtimes</h3>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map((showtime) => (
              <tr key={showtime._id}>
                <td>{showtime.time}</td>
                <td>{showtime.type}</td>
                <td>
                  <button onClick={() => handleDeleteShowtime(showtime._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Showtime Form */}
      <div>
        <h3>Add New Showtime</h3>
        <input
          type="text"
          placeholder="Enter Time"
          value={newShowtime.time}
          onChange={(e) => setNewShowtime({ ...newShowtime, time: e.target.value })}
        />
        <select
          onChange={(e) => setNewShowtime({ ...newShowtime, type: e.target.value })}
          value={newShowtime.type}
        >
          <option value="">Select Type</option>
          <option value="Standard">Standard</option>
          <option value="IMAX">IMAX</option>
          <option value="Dolby Atmos">Dolby Atmos</option>
        </select>
        <button onClick={handleAddShowtime}>Add Showtime</button>
      </div>
    </div>
  );
};

export default ShowtimeManager;
