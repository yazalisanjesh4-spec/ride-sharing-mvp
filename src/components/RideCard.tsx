type Props = {
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
  isOwnRide?: boolean;
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
  isOwnRide = false,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Route */}
      <p className="text-base font-semibold text-gray-900 mb-1">
        {from} → {to}
      </p>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
        <div>📅 {date}</div>
        <div>⏰ {time}</div>
        <div>{vehicleType === "bike" ? "🏍 Bike" : "🚗 Car"}</div>
        <div>👥 {availableSeats} seat(s)</div>
      </div>

      {/* Gender */}
      <p className="text-sm text-gray-600 mb-2">
        Gender preference:{" "}
        <span className="font-medium capitalize">
          {genderPreference}
        </span>
      </p>

      {/* Pickup */}
      {pickupNotes && (
        <p className="text-sm text-gray-500 mb-3">
          📍 {pickupNotes}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-900">
          ₹{costPerSeat}
          <span className="text-sm font-normal text-gray-500">
            {" "}
            / seat
          </span>
        </p>

        <button
          disabled={availableSeats === 0 || isOwnRide}
          onClick={onBook}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            availableSeats === 0 || isOwnRide
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {isOwnRide
            ? "Your Ride"
            : availableSeats === 0
            ? "Full"
            : "Book"}
        </button>
      </div>
    </div>
  );
}