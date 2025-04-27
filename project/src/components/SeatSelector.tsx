import React, { useState } from 'react';

interface SeatSelectorProps {
  totalSeats?: number;
  onSelectionChange: (selectedSeats: number[]) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({
  totalSeats = 40,
  onSelectionChange,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seatNumber: number) => {
    let updatedSeats: number[];
    if (selectedSeats.includes(seatNumber)) {
      updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
    } else {
      updatedSeats = [...selectedSeats, seatNumber];
    }
    setSelectedSeats(updatedSeats);
    onSelectionChange(updatedSeats);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Select Your Seats</h2>
      <div className="grid grid-cols-8 gap-3">
        {[...Array(totalSeats)].map((_, i) => {
          const seatNumber = i + 1;
          const isSelected = selectedSeats.includes(seatNumber);

          return (
            <button
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              className={`p-2 rounded-md text-sm font-semibold border ${
                isSelected
                  ? 'bg-green-500 text-white border-green-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
        </p>
      </div>
    </div>
  );
};

export default SeatSelector;
