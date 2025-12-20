"use client";

import { useState } from "react";
import { LOCATIONS } from "@/data/locations";
import RideCard from "@/components/RideCard";

type Ride = {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  vehicleType: "bike" | "car";
  availableSeats: number;
  genderPreference: "any" | "male" | "female";
  costPerSeat: number;
  pickupNotes?: string;
};

const INITIAL_RIDES: Ride[] = [
  {
    id: 1,
    from: "Bangalore",
    to: "Chennai",
    date: "2025-01-10",
    time: "09:00",
    vehicleType: "car",
    availableSeats: 3,
    genderPreference: "any",
    costPerSeat: 150,
    pickupNotes: "Near Silk Board signal",
  },
  {
    id: 2,
    from: "Mumbai",
    to: "Pune",
    date: "2025-01-10",
    time: "14:30",
    vehicleType: "bike",
    availableSeats: 1,
    genderPreference: "female",
    costPerSeat: 80,
    pickupNotes: "Metro gate 2",
  },
];

export default function BookRidePage() {
  const [rides, setRides] = useState(INITIAL_RIDES);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  function getSuggestions(value: string) {
    if (!value) return [];
    return LOCATIONS.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    );
  }

  function handleBookRide(ride: Ride) {
    const confirmed = window.confirm(
      `Confirm booking?\n\n${ride.from} → ${ride.to}\n₹${ride.costPerSeat} per seat`
    );
    if (!confirmed) return;

    setRides((prev) =>
      prev.map((r) =>
        r.id === ride.id && r.availableSeats > 0
          ? { ...r, availableSeats: r.availableSeats - 1 }
          : r
      )
    );
  }

  const filteredRides = rides.filter(
    (ride) =>
      (!from || ride.from === from) &&
      (!to || ride.to === to) &&
      (!date || ride.date === date)
  );

  return (
    <main className="min-h-screen bg-white px-4 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Book a Ride
        </h1>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* From */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">From</label>
            <input
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setShowFromSuggestions(true);
              }}
              placeholder="Starting location"
              suppressHydrationWarning
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 placeholder-gray-400"
            />
            {showFromSuggestions && getSuggestions(from).length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1">
                {getSuggestions(from).map((loc) => (
                  <li
                    key={loc}
                    onClick={() => {
                      setFrom(loc);
                      setShowFromSuggestions(false);
                    }}
                    className="px-3 py-2 bg-white text-gray-800 hover:bg-gray-100 cursor-pointer"
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* To */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">To</label>
            <input
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setShowToSuggestions(true);
              }}
              placeholder="Destination"
              suppressHydrationWarning
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 placeholder-gray-400"
            />
            {showToSuggestions && getSuggestions(to).length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1">
                {getSuggestions(to).map((loc) => (
                  <li
                    key={loc}
                    onClick={() => {
                      setTo(loc);
                      setShowToSuggestions(false);
                    }}
                    className="px-3 py-2 bg-white text-gray-800 hover:bg-gray-100 cursor-pointer"
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Rides */}
        <div className="space-y-4">
          {filteredRides.map((ride) => (
            <RideCard
              key={ride.id}
              from={ride.from}
              to={ride.to}
              date={ride.date}
              time={ride.time}
              vehicleType={ride.vehicleType}
              availableSeats={ride.availableSeats}
              genderPreference={ride.genderPreference}
              costPerSeat={ride.costPerSeat}
              pickupNotes={ride.pickupNotes}
              onBook={() => handleBookRide(ride)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}