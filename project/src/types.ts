export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop?: string;
  genre: string[];
  language: string;
  duration: string;
  rating: string;
  releaseDate: string;
  synopsis?: string;
  trailer?: string;
  cast?: CastMember[];
}

export interface CastMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface ShowTime {
  id: string;
  time: string;
  type: 'Standard' | 'VIP' | 'Recliner';
  price: number;
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
  city: string;
  amenities: string[];
  showTimes: ShowTime[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bookings?: Booking[];
  loyaltyPoints: number;
}

export interface Booking {
  id: string;
  movieId: string;
  cinemaId: string;
  showTimeId: string;
  seats: string[];
  totalAmount: number;
  date: string;
  status: 'confirmed' | 'cancelled';
}