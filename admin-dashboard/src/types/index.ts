export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number;
  genre: string[];
  cast: string[];
  posterUrl: string;
  trailerUrl: string;
  releaseDate: string;
}

export interface Show {
  id: string;
  movieId: string;
  screenId: string;
  startTime: string;
  endTime: string;
  price: {
    vip: number;
    regular: number;
    balcony: number;
  };
  availableSeats: {
    vip: number;
    regular: number;
    balcony: number;
  };
}

export interface Screen {
  id: string;
  name: string;
  capacity: {
    vip: number;
    regular: number;
    balcony: number;
  };
  status: 'active' | 'maintenance';
}

export interface Booking {
  id: string;
  userId: string;
  showId: string;
  movieId: string;
  seats: {
    type: 'vip' | 'regular' | 'balcony';
    number: string;
  }[];
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'refunded';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  createdAt: string;
}

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  upcomingMovies: number;
}