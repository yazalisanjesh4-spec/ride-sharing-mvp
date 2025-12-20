"use client";

import { useState } from "react";
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
  contactNumber: string;
};

/* Mock booked rides */
const INITIAL_BOOKED_RIDES: Ride[] = [
  {
    id: 1,
    from: "Bangalore",
    to: "Chennai",
    date: "2025-01-10",
    time: "09:00",
    vehicleType: "car",
    availableSeats: 2,
    genderPreference: "any",
    costPerSeat: 150,
    contactNumber: "+91 98765 43210",
  },
];

/* Mock posted rides */
const INITIAL_POSTED_RIDES: Ride[] = [
  {
    id: 2,
    from: "Mumbai",
    to: "Pune",
    date: "2025-01-12",
    time: "14:30",
    vehicleType: "bike",
    availableSeats: 0,
    genderPreference: "female",
    costPerSeat: 80,
    contactNumber: "+91 91234 56789",
  },
];

export default function RideHistoryPage() {
  const [bookedRides, setBookedRides] = useState<Ride[]>(
    INITIAL_BOOKED_RIDES
  );
  const [postedRides, setPostedRides] = useState<Ride[]>(
    INITIAL_POSTED_RIDES
  );

  function cancelBooking(rideId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmed) return;

    setBookedRides((prev) =>
      prev.filter((ride) => ride.id !== rideId)
    );
  }

  function cancelPostedRide(rideId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this ride?"
    );
    if (!confirmed) return;

    setPostedRides((prev) =>
      prev.filter((ride) => ride.id !== rideId)
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Ride History
        </h1>

        {/* Booked Rides */}
        <section className="mb-10">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Booked Rides
          </h2>

          {bookedRides.length === 0 ? (
            <p className="text-sm text-gray-500">
              You haven’t booked any rides yet.
            </p>
          ) : (
            <div className="space-y-4">
              {bookedRides.map((ride) => (
                <div
                  key={ride.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <RideCard
                    from={ride.from}
                    to={ride.to}
                    date={ride.date}
                    time={ride.time}
                    vehicleType={ride.vehicleType}
                    availableSeats={ride.availableSeats}
                    genderPreference={ride.genderPreference}
                    costPerSeat={ride.costPerSeat}
                    onBook={() => {}}
                  />

                  {/* Contact */}
                  <div className="mt-3 text-sm text-gray-700">
                    📞 Contact rider:{" "}
                    <a
                      href={`tel:${ride.contactNumber}`}
                      className="text-blue-600 underline"
                    >
                      {ride.contactNumber}
                    </a>
                  </div>

                  {/* Cancel */}
                  <button
                    onClick={() => cancelBooking(ride.id)}
                    className="mt-4 w-full border border-red-300 text-red-600 py-2 rounded-lg"
                  >
                    Cancel Booking
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Posted Rides */}
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Posted Rides
          </h2>

          {postedRides.length === 0 ? (
            <p className="text-sm text-gray-500">
              You haven’t posted any rides yet.
            </p>
          ) : (
            <div className="space-y-4">
              {postedRides.map((ride) => (
                <div
                  key={ride.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <RideCard
                    from={ride.from}
                    to={ride.to}
                    date={ride.date}
                    time={ride.time}
                    vehicleType={ride.vehicleType}
                    availableSeats={ride.availableSeats}
                    genderPreference={ride.genderPreference}
                    costPerSeat={ride.costPerSeat}
                    onBook={() => {}}
                  />

                  <button
                    onClick={() => cancelPostedRide(ride.id)}
                    className="mt-4 w-full border border-red-300 text-red-600 py-2 rounded-lg"
                  >
                    Cancel Ride
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}