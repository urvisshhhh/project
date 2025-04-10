import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Download, Calendar, Clock, MapPin, Ticket } from 'lucide-react';

const BookingConfirmation = () => {
  // In a real app, this would come from context/state
  const bookingDetails = {
    bookingId: 'PVR12345678',
    movie: 'Dune: Part Two',
    date: 'Friday, 15 March 2024',
    time: '4:00 PM',
    cinema: 'PVR Luxe, Downtown Mall',
    screen: 'IMAX Screen 2',
    seats: ['A4', 'A5', 'A6'],
    totalAmount: 1380,
    qrCode: true
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          {/* Success header */}
          <div className="bg-green-600 p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-white">Booking Confirmed!</h1>
            <p className="text-white/80">Your tickets have been booked successfully</p>
          </div>

          {/* Ticket details */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <button className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-md font-medium hover:bg-gold/90 transition">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">{bookingDetails.movie}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-400">{bookingDetails.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Show Time</p>
                      <p className="text-gray-400">{bookingDetails.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Cinema</p>
                      <p className="text-gray-400">{bookingDetails.cinema}</p>
                      <p className="text-gray-400">{bookingDetails.screen}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Ticket className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Seats</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {bookingDetails.seats.map((seat) => (
                          <span key={seat} className="px-2 py-1 bg-gray-700 rounded text-sm">
                            {seat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                {bookingDetails.qrCode && (
                  <div className="bg-white p-4 rounded-md mb-4">
                    <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                      <QrCode />
                    </div>
                  </div>
                )}
                <p className="text-sm text-gray-400 text-center">
                  Booking ID: {bookingDetails.bookingId}
                </p>
                <p className="text-sm text-gray-400 text-center mt-1">
                  Amount Paid: ₹{bookingDetails.totalAmount}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-700 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-300">Need help with your booking?</p>
              <p className="text-gold">Call us at 1800-123-4567</p>
            </div>
            <Link
              to="/"
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-md transition"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// QR Code component
const QrCode = () => (
  <svg
    width="160"
    height="160"
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black"
  >
    <rect width="160" height="160" fill="white" />
    <rect x="20" y="20" width="10" height="10" fill="currentColor" />
    <rect x="30" y="20" width="10" height="10" fill="currentColor" />
    <rect x="40" y="20" width="10" height="10" fill="currentColor" />
    <rect x="50" y="20" width="10" height="10" fill="currentColor" />
    <rect x="60" y="20" width="10" height="10" fill="currentColor" />
    <rect x="70" y="20" width="10" height="10" fill="currentColor" />
    <rect x="90" y="20" width="10" height="10" fill="currentColor" />
    <rect x="110" y="20" width="10" height="10" fill="currentColor" />
    <rect x="120" y="20" width="10" height="10" fill="currentColor" />
    <rect x="130" y="20" width="10" height="10" fill="currentColor" />
    <rect x="20" y="30" width="10" height="10" fill="currentColor" />
    <rect x="70" y="30" width="10" height="10" fill="currentColor" />
    <rect x="90" y="30" width="10" height="10" fill="currentColor" />
    <rect x="100" y="30" width="10" height="10" fill="currentColor" />
    <rect x="130" y="30" width="10" height="10" fill="currentColor" />
    <rect x="20" y="40" width="10" height="10" fill="currentColor" />
    <rect x="40" y="40" width="10" height="10" fill="currentColor" />
    <rect x="50" y="40" width="10" height="10" fill="currentColor" />
    <rect x="60" y="40" width="10" height="10" fill="currentColor" />
    <rect x="70" y="40" width="10" height="10" fill="currentColor" />
    <rect x="90" y="40" width="10" height="10" fill="currentColor" />
    <rect x="130" y="40" width="10" height="10" fill="currentColor" />
    <rect x="20" y="50" width="10" height="10" fill="currentColor" />
    <rect x="40" y="50" width="10" height="10" fill="currentColor" />
    <rect x="50" y="50" width="10" height="10" fill="currentColor" />
    <rect x="60" y="50" width="10" height="10" fill="currentColor" />
    <rect x="70" y="50" width="10" height="10" fill="currentColor" />
    <rect x="90" y="50" width="10" height="10" fill="currentColor" />
    <rect x="100" y="50" width="10" height="10" fill="currentColor" />
    <rect x="110" y="50" width="10" height="10" fill="currentColor" />
    <rect x="130" y="50" width="10" height="10" fill="currentColor" />
    <rect x="20" y="60" width="10" height="10" fill="currentColor" />
    <rect x="40" y="60" width="10" height="10" fill="currentColor" />
    <rect x="50" y="60" width="10" height="10" fill="currentColor" />
    <rect x="60" y="60" width="10" height="10" fill="currentColor" />
    <rect x="70" y="60" width="10" height="10" fill="currentColor" />
    <rect x="90" y="60" width="10" height="10" fill="currentColor" />
    <rect x="130" y="60" width="10" height="10" fill="currentColor" />
    <rect x="20" y="70" width="10" height="10" fill="currentColor" />
    <rect x="70" y="70" width="10" height="10" fill="currentColor" />
    <rect x="90" y="70" width="10" height="10" fill="currentColor" />
    <rect x="110" y="70" width="10" height="10" fill="currentColor" />
    <rect x="130" y="70" width="10" height="10" fill="currentColor" />
    <rect x="20" y="80" width="10" height="10" fill="currentColor" />
    <rect x="30" y="80" width="10" height="10" fill="currentColor" />
    <rect x="40" y="80" width="10" height="10" fill="currentColor" />
    <rect x="50" y="80" width="10" height="10" fill="currentColor" />
    <rect x="60" y="80" width="10" height="10" fill="currentColor" />
    <rect x="70" y="80" width="10" height="10" fill="currentColor" />
    <rect x="90" y="80" width="10" height="10" fill="currentColor" />
    <rect x="110" y="80" width="10" height="10" fill="currentColor" />
    <rect x="130" y="80" width="10" height="10" fill="currentColor" />
    <rect x="30" y="90" width="10" height="10" fill="currentColor" />
    <rect x="50" y="90" width="10" height="10" fill="currentColor" />
    <rect x="70" y="90" width="10" height="10" fill="currentColor" />
    <rect x="80" y="90" width="10" height="10" fill="currentColor" />
    <rect x="100" y="90" width="10" height="10" fill="currentColor" />
    <rect x="110" y="90" width="10" height="10" fill="currentColor" />
    <rect x="120" y="90" width="10" height="10" fill="currentColor" />
    <rect x="20" y="100" width="10" height="10" fill="currentColor" />
    <rect x="40" y="100" width="10" height="10" fill="currentColor" />
    <rect x="60" y="100" width="10" height="10" fill="currentColor" />
    <rect x="80" y="100" width="10" height="10" fill="currentColor" />
    <rect x="90" y="100" width="10" height="10" fill="currentColor" />
    <rect x="100" y="100" width="10" height="10" fill="currentColor" />
    <rect x="110" y="100" width="10" height="10" fill="currentColor" />
    <rect x="120" y="100" width="10" height="10" fill="currentColor" />
    <rect x="130" y="100" width="10" height="10" fill="currentColor" />
    <rect x="20" y="110" width="10" height="10" fill="currentColor" />
    <rect x="30" y="110" width="10" height="10" fill="currentColor" />
    <rect x="40" y="110" width="10" height="10" fill="currentColor" />
    <rect x="50" y="110" width="10" height="10" fill="currentColor" />
    <rect x="70" y="110" width="10" height="10" fill="currentColor" />
    <rect x="80" y="110" width="10" height="10" fill="currentColor" />
    <rect x="90" y="110" width="10" height="10" fill="currentColor" />
    <rect x="100" y="110" width="10" height="10" fill="currentColor" />
    <rect x="110" y="110" width="10" height="10" fill="currentColor" />
    <rect x="120" y="110" width="10" height="10" fill="currentColor" />
    <rect x="130" y="110" width="10" height="10" fill="currentColor" />
    <rect x="30" y="120" width="10" height="10" fill="currentColor" />
    <rect x="40" y="120" width="10" height="10" fill="currentColor" />
    <rect x="50" y="120" width="10" height="10" fill="currentColor" />
    <rect x="60" y="120" width="10" height="10" fill="currentColor" />
    <rect x="70" y="120" width="10" height="10" fill="currentColor" />
    <rect x="80" y="120" width="10" height="10" fill="currentColor" />
    <rect x="90" y="120" width="10" height="10" fill="currentColor" />
    <rect x="100" y="120" width="10" height="10" fill="currentColor" />
    <rect x="110" y="120" width="10" height="10" fill="currentColor" />
    <rect x="120" y="120" width="10" height="10" fill="currentColor" />
    <rect x="20" y="130" width="10" height="10" fill="currentColor" />
    <rect x="30" y="130" width="10" height="10" fill="currentColor" />
    <rect x="40" y="130" width="10" height="10" fill="currentColor" />
    <rect x="50" y="130" width="10" height="10" fill="currentColor" />
    <rect x="60" y="130" width="10" height="10" fill="currentColor" />
    <rect x="70" y="130" width="10" height="10" fill="currentColor" />
    <rect x="90" y="130" width="10" height="10" fill="currentColor" />
    <rect x="110" y="130" width="10" height="10" fill="currentColor" />
    <rect x="120" y="130" width="10" height="10" fill="currentColor" />
    <rect x="130" y="130" width="10" height="10" fill="currentColor" />
  </svg>
);

export default BookingConfirmation;