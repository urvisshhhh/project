import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Clock, Calendar, CreditCard, Film, Ticket } from "lucide-react";

// Seat categories with price and color
type SeatCategory = "Premium" | "Royal" | "Executive" | "Economy";
type SeatStatus = "Available" | "Sold Out";

const seatCategories: Record<SeatCategory, { price: number; color: string }> = {
  Premium: { price: 500, color: "bg-gold text-black" },
  Royal: { price: 350, color: "bg-blue-500 text-white" },
  Executive: { price: 250, color: "bg-green-500 text-white" },
  Economy: { price: 150, color: "bg-gray-600 text-white" },
};

const seatStatus: Record<SeatStatus, string> = {
  Available: "border-gray-500 hover:border-white",
  "Sold Out": "border-red-500 opacity-50 cursor-not-allowed",
};

// Define seat type
interface Seat {
  id: string;
  category: SeatCategory;
  status: SeatStatus;
}

// Generate seat layout
const generateSeats = () => {
  const seats: Seat[][] = [];
  let rowNumber = 1;

  const addRows = (category: SeatCategory, rows: number, cols: number) => {
    for (let row = 0; row < rows; row++) {
      const seatRow: Seat[] = [];
      for (let col = 0; col < cols; col++) {
        const seatId = `${String.fromCharCode(64 + rowNumber)}${col + 1}`;
        const status: SeatStatus = Math.random() < 0.2 ? "Sold Out" : "Available";
        seatRow.push({ id: seatId, category, status });
      }
      seats.push(seatRow);
      rowNumber++;
    }
  };

  addRows("Premium", 2, 10);
  addRows("Royal", 4, 10);
  addRows("Executive", 3, 8);
  addRows("Economy", 2, 8);

  return seats;
};

// Showtime options
const showtimes = [
  { id: "1", time: "10:30 AM", type: "Standard" },
  { id: "2", time: "1:15 PM", type: "Standard" },
  { id: "3", time: "4:00 PM", type: "IMAX" },
  { id: "4", time: "7:30 PM", type: "Dolby Atmos" },
  { id: "5", time: "10:45 PM", type: "Standard" },
];

const SeatLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const seatRows = generateSeats();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState(showtimes[2]);

  // Toggle seat selection
  const toggleSeat = (seat: Seat) => {
    if (seat.status === "Sold Out") return;
    setSelectedSeats((prev) =>
      prev.some((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  // Calculate total price
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seatCategories[seat.category].price, 0);

  // Proceed to Payment: Redirects to login if not authenticated
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/payment");
    } else {
      navigate("/login", { state: { from: "/payment" } });
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-gold flex items-center gap-2">
            <Film className="w-8 h-8 text-gold" />
            Select Your Seats
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Dune: Part Two • IMAX • PVR Luxe</p>
        </div>

        {/* Showtime Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Select Showtime</h2>
          <div className="flex flex-wrap gap-3">
            {showtimes.map((showtime) => (
              <button
                key={showtime.id}
                onClick={() => setSelectedShowtime(showtime)}
                className={`px-5 py-3 rounded-md text-md font-semibold transition ${
                  selectedShowtime.id === showtime.id
                    ? "bg-gold text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {showtime.time} - {showtime.type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seat layout */}
          <div className="lg:col-span-3">
            <div className="w-full h-10 bg-gray-700 rounded-t-lg mb-6 flex items-center justify-center text-sm text-gray-300">
              SCREEN THIS WAY
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              {seatRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex justify-center gap-3 mb-2">
                  <div className="w-6 flex items-center justify-center text-gray-400 text-sm">
                    {row[0]?.id.charAt(0)}
                  </div>
                  {row.map((seat) => {
                    const isSelected = selectedSeats.some((s) => s.id === seat.id);
                    return (
                      <motion.button
                        key={seat.id}
                        className={`w-10 h-10 text-sm font-semibold rounded transition-all flex items-center justify-center border-2 ${
                          isSelected
                            ? "bg-red-500 text-white border-white"
                            : `${seatCategories[seat.category].color} ${seatStatus[seat.status]}`
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSeat(seat)}
                        disabled={seat.status === "Sold Out"}
                      >
                        {seat.id.substring(1)}
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1 bg-gray-800 p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Ticket Price</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Convenience Fee</span>
              <span>₹{selectedSeats.length > 0 ? 30 : 0}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalPrice + (selectedSeats.length > 0 ? 30 : 0)}</span>
            </div>
            <button
              className="w-full bg-gold text-black font-semibold py-3 rounded-md hover:bg-gold/90 transition mt-4 flex items-center justify-center gap-2"
              disabled={selectedSeats.length === 0}
              onClick={handleProceedToPayment}
            >
              <CreditCard className="w-5 h-5" />
              <span>Proceed to Payment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
