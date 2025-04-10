import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Shows from "./pages/Shows";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import MovieList from "./pages/MovieList";
import AddMovie from "./pages/AddMovie";
import UpdateMovie from "./pages/UpdateMovie";
import Settings from "./pages/Settings";
import CinemaPage from "./pages/CinemaPage";
import CinemaForm from "./pages/CinemaForm";
import EditCinema from "./pages/EditCinema"; // ✅ Import EditCinema Page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="shows" element={<Shows />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/movies" element={<MovieList />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/update-movie/:id" element={<UpdateMovie />} />
        <Route path="*" element={<MovieList />} /> {/* Default to movie list */}
     

          {/* ✅ Corrected Cinema Routes */}
          <Route path="cinemas" element={<CinemaPage />} />
          <Route path="cinemas/add" element={<CinemaForm />} />
          <Route path="cinemas/edit/:id" element={<EditCinema />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
