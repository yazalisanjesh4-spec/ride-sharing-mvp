type RideCardProps = {
  from: string;
  to: string;
  date: string;
  time: string;
  vehicleType: "bike" | "car";
  availableSeats: number;
  genderPreference: "any" | "male" | "female";
  costPerSeat: number;
  pickupNotes?: string;
  onBook: () => void;
};

export default function RideCard({
  from,
  to,
  date,
  time,
  vehicleType,
  availableSeats,
  genderPreference,
  costPerSeat,
  pickupNotes,
  onBook,
}: RideCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-900">
          {from} → {to}
        </span>
        <span className="text-sm text-gray-500">
          {vehicleType.toUpperCase()}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-1">
        {date} at {time}
      </div>

      {pickupNotes && (
        <div className="text-sm text-gray-600 mb-1">
          📍 {pickupNotes}
        </div>
      )}

      <div className="text-sm text-gray-700 mb-2">
        ₹{costPerSeat} per seat
      </div>

      <div className="flex justify-between text-sm text-gray-600 mb-3">
        <span>Seats left: {availableSeats}</span>
        <span>
          {genderPreference === "any"
            ? "Any gender"
            : `${genderPreference} only`}
        </span>
      </div>

      <button
        onClick={onBook}
        disabled={availableSeats === 0}
        className={`w-full py-2 rounded-lg ${
          availableSeats === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-900 text-white"
        }`}
      >
        {availableSeats === 0 ? "Ride Full" : "Book Ride"}
      </button>
    </div>
  );
}