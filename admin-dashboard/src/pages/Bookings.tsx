import React from "react";

type BookingStatus = "confirmed" | "cancelled" | "refunded";
type PaymentStatus = "paid" | "pending" | "refunded";

interface Booking {
  id: string;
  userId: string;
  userName: string;
  movieTitle: string;
  showTime: string;
  seats: { type: string; number: string }[];
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    userName: "Dhruvi Brahmbhatt",
    movieTitle: "Inception",
    showTime: "2024-03-20T14:00:00Z",
    seats: [
      { type: "vip", number: "A1" },
      { type: "vip", number: "A2" },
    ],
    totalAmount: 250,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2024-03-19T10:30:00Z",
  },
  {
    id: "2",
    userId: "2",
    userName: "urvish",
    movieTitle: "The Dark Knight",
    showTime: "2024-03-20T17:00:00Z",
    seats: [
      { type: "regular", number: "B5" },
      { type: "regular", number: "B6" },
      { type: "regular", number: "B7" },
    ],
    totalAmount: 450,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2024-03-19T11:45:00Z",
  },
];

const statusColors: Record<BookingStatus, string> = {
  confirmed: "bg-green-500",
  cancelled: "bg-red-500",
  refunded: "bg-yellow-500",
};

const paymentStatusColors: Record<PaymentStatus, string> = {
  paid: "bg-green-500",
  pending: "bg-yellow-500",
  refunded: "bg-red-500",
};

const BookingsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">User</th>
            <th className="border border-gray-300 px-4 py-2">Movie</th>
            <th className="border border-gray-300 px-4 py-2">Show Time</th>
            <th className="border border-gray-300 px-4 py-2">Seats</th>
            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Payment Status</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {mockBookings.map((booking) => (
            <tr key={booking.id} className="border border-gray-200">
              <td className="border border-gray-300 px-4 py-2">{booking.userName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.movieTitle}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.showTime}</td>
              <td className="border border-gray-300 px-4 py-2">
                {booking.seats.map((seat) => seat.number).join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">${booking.totalAmount}</td>
              <td className="border border-gray-300 px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${statusColors[booking.status]} text-white`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${paymentStatusColors[booking.paymentStatus]} text-white`}
                >
                  {booking.paymentStatus}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">{booking.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
