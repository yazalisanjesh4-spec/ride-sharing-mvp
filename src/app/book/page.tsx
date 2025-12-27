"use client";

import { useState } from "react";
import { LOCATIONS } from "@/data/locations";
import RideCard from "@/components/RideCard";

type Ride = {
  id: number;
  from: string;
  to: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm (24h)
  vehicleType: "bike" | "car";
  availableSeats: number;
  genderPreference: "any" | "male" | "female";
  costPerSeat: number;
  pickupNotes?: string;
  postedBy: string;
};

const CURRENT_USER_ID = "user_123"; // mock logged-in user

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
    postedBy: "user_999",
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
    postedBy: "user_123", // own ride
  },
];

export default function BookRidePage() {
  const [rides, setRides] = useState(INITIAL_RIDES);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  /* ---------- helpers ---------- */

  function getSuggestions(value: string) {
    if (!value) return [];
    return LOCATIONS.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    );
  }

  function isPastRide(ride: Ride) {
    const rideDateTime = new Date(`${ride.date}T${ride.time}`);
    return rideDateTime < new Date();
  }

  function formatTo12Hour(time: string) {
    if (!time) return "";
    const [h, m] = time.split(":");
    let hour = Number(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${m} ${ampm}`;
  }

  /* ---------- booking ---------- */

  function handleBookRide(ride: Ride) {
    if (ride.postedBy === CURRENT_USER_ID) {
      alert("You cannot book your own ride");
      return;
    }

    if (isPastRide(ride)) {
      alert("This ride has already started or ended");
      return;
    }

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

  /* ---------- filtering ---------- */

  const filteredRides = rides.filter(
    (ride) =>
      (!from || ride.from === from) &&
      (!to || ride.to === to) &&
      (!date || ride.date === date) &&
      (!time || ride.time === time)
  );

  /* ---------- UI ---------- */

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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
            />
            {showFromSuggestions && getSuggestions(from).length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow">
                {getSuggestions(from).map((loc) => (
                  <li
                    key={loc}
                    onClick={() => {
                      setFrom(loc);
                      setShowFromSuggestions(false);
                    }}
                    className="px-3 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
            />
            {showToSuggestions && getSuggestions(to).length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow">
                {getSuggestions(to).map((loc) => (
                  <li
                    key={loc}
                    onClick={() => {
                      setTo(loc);
                      setShowToSuggestions(false);
                    }}
                    className="px-3 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer"
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
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
            />
            {time && (
              <p className="mt-1 text-xs text-gray-500">
                Selected: {formatTo12Hour(time)}
              </p>
            )}
          </div>
        </div>

        {/* Ride Cards */}
        <div className="space-y-4">
          {filteredRides.map((ride) => (
            <RideCard
              key={ride.id}
              from={ride.from}
              to={ride.to}
              date={ride.date}
              time={formatTo12Hour(ride.time)} // ✅ 12h display
              vehicleType={ride.vehicleType}
              availableSeats={ride.availableSeats}
              genderPreference={ride.genderPreference}
              costPerSeat={ride.costPerSeat}
              pickupNotes={ride.pickupNotes}
              isOwnRide={ride.postedBy === CURRENT_USER_ID}
              
              onBook={() => handleBookRide(ride)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}