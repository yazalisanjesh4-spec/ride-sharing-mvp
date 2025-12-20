"use client";

import { useState } from "react";
import { LOCATIONS } from "@/data/locations";

export default function OfferRidePage() {
  const [vehicleType, setVehicleType] = useState<"bike" | "car">("bike");
  const [seats, setSeats] = useState(1);
  const [costPerSeat, setCostPerSeat] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pickupNotes, setPickupNotes] = useState("");

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  function handleVehicleChange(type: "bike" | "car") {
    setVehicleType(type);
    setSeats(1);
  }

  function getSuggestions(value: string) {
    if (!value) return [];
    return LOCATIONS.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Offer a Ride
        </h1>

        {/* Vehicle Type */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            Vehicle Type
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => handleVehicleChange("bike")}
              className={`flex-1 py-2 rounded-lg border text-gray-800 ${
                vehicleType === "bike"
                  ? "bg-gray-100 border-gray-900"
                  : "bg-white border-gray-300"
              }`}
            >
              Bike
            </button>
            <button
              onClick={() => handleVehicleChange("car")}
              className={`flex-1 py-2 rounded-lg border text-gray-800 ${
                vehicleType === "car"
                  ? "bg-gray-100 border-gray-900"
                  : "bg-white border-gray-300"
              }`}
            >
              Car
            </button>
          </div>
        </div>

        {/* Seats */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Seats Available
          </label>
          <select
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800"
          >
            {vehicleType === "bike" ? (
              <option value={1}>1 seat</option>
            ) : (
              <>
                <option value={1}>1 seat</option>
                <option value={2}>2 seats</option>
                <option value={3}>3 seats</option>
              </>
            )}
          </select>
        </div>

        {/* Cost */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Cost per seat (₹)
          </label>
          <input
            type="number"
            value={costPerSeat}
            onChange={(e) => setCostPerSeat(e.target.value)}
            placeholder="e.g. 150"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* From */}
        <div className="mb-4 relative">
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
        <div className="mb-4 relative">
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

        {/* Pickup Notes */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Pickup notes (optional)
          </label>
          <input
            value={pickupNotes}
            onChange={(e) => setPickupNotes(e.target.value)}
            placeholder="e.g. Near metro gate 2"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Date & Time */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800"
          />
        </div>

        <button className="w-full bg-gray-900 text-white py-3 rounded-lg">
          Post Ride
        </button>
      </div>
    </main>
  );
}