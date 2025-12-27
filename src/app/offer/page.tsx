"use client";

import { useState } from "react";
import { LOCATIONS } from "@/data/locations";
import { useRouter } from "next/navigation";

export default function OfferRidePage() {
  const router = useRouter();

  const [vehicleType, setVehicleType] = useState<"bike" | "car">("bike");
  const [seats, setSeats] = useState(1);
  const [costPerSeat, setCostPerSeat] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pickupNotes, setPickupNotes] = useState("");

  const [genderPreference, setGenderPreference] = useState<
    "any" | "female" | "male"
  >("any");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const isFormValid =
    from.trim() !== "" &&
    to.trim() !== "" &&
    date !== "" &&
    time !== "" &&
    Number(costPerSeat) > 0;

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

  const today = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toTimeString().slice(0, 5);

  function handlePostRide() {
    if (!isFormValid) return;

    const vehicle = localStorage.getItem("vehicleDetails");

    if (!vehicle) {
      alert("Please add vehicle & license details before posting a ride");
      router.push("/profile/vehicle");
      return;
    }

    alert("Ride posted successfully (mock)");
  }

  // ✅ Reliable 12-hour formatter
  function formatTo12Hour(time: string) {
    if (!time) return "";

    const [h, m] = time.split(":");
    let hour = Number(h);
    const minute = m.padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minute} ${ampm}`;
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
              className={`flex-1 py-2 rounded-lg border text-gray-900 ${
                vehicleType === "bike"
                  ? "bg-gray-100 border-gray-900"
                  : "bg-white border-gray-300"
              }`}
            >
              Bike
            </button>

            <button
              onClick={() => handleVehicleChange("car")}
              className={`flex-1 py-2 rounded-lg border text-gray-900 ${
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
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

        {/* Gender */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Gender Preference
          </label>

          <select
            value={genderPreference}
            onChange={(e) =>
              setGenderPreference(e.target.value as "any" | "female" | "male")
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
          >
            <option value="any">Any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        {/* Cost */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Cost per seat (₹)
          </label>

          <input
            type="number"
            min={0}
            value={costPerSeat}
            onChange={(e) =>
              setCostPerSeat(Math.max(0, Number(e.target.value)).toString())
            }
            placeholder="e.g. 150"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
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
        <div className="mb-4 relative">
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

        {/* Pickup */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Pickup notes (optional)
          </label>
          <input
            value={pickupNotes}
            onChange={(e) => setPickupNotes(e.target.value)}
            placeholder="e.g. Near metro gate 2"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
          />
        </div>

        {/* Time */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Time</label>
          <input
            type="time"
            value={time}
            min={date === today ? nowTime : undefined}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
          />
          {time && (
            <p className="mt-1 text-sm text-gray-600">
              Selected time:{" "}
              <span className="font-medium text-gray-900">
                {formatTo12Hour(time)}
              </span>
            </p>
          )}
        </div>

        <button
          onClick={handlePostRide}
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg text-white transition ${
            isFormValid
              ? "bg-indigo-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Post Ride
        </button>
      </div>
    </main>
  );
}