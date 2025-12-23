"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";

type Vehicle = {
  type: string;
  number: string;
};

export default function ProfilePage() {
  const router = useRouter();

  // Mock user (later from Firebase)
  const user = {
    username: "sanjesh",
    gender: "Male",
  };

  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [savedVehicle, setSavedVehicle] = useState<Vehicle | null>(null);
  const [error, setError] = useState("");

  // Load saved vehicle (MVP)
  useEffect(() => {
    const stored = localStorage.getItem("savedVehicle");
    if (stored) {
      setSavedVehicle(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    setError("");

    const vehicleRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{1,4}$/;
    const licenseRegex = /^[A-Z0-9\- ]{10,20}$/;

    if (!vehicleType) {
      setError("Please select vehicle type");
      return;
    }

    if (!vehicleRegex.test(vehicleNumber)) {
      setError("Invalid vehicle number");
      return;
    }

    if (!licenseRegex.test(licenseNumber)) {
      setError("Invalid license number");
      return;
    }

    const vehicle = {
      type: vehicleType,
      number: vehicleNumber,
    };

    localStorage.setItem("savedVehicle", JSON.stringify(vehicle));
    localStorage.setItem("profileCompleted", "true");

    setSavedVehicle(vehicle);
    setVehicleType("");
    setVehicleNumber("");

    alert("Vehicle saved successfully");
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("profileCompleted");
    localStorage.removeItem("savedVehicle");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-white px-4 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Profile
        </h1>

        {/* User Info */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500">Username</p>
          <p className="text-gray-900 font-medium mb-3">
            {user.username}
          </p>

          <p className="text-sm text-gray-500">Gender</p>
          <p className="text-gray-900 font-medium">
            {user.gender}
          </p>
        </div>

        {/* Saved Vehicles */}
        {savedVehicle && (
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-3">
              Saved Vehicle
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {savedVehicle.type.toUpperCase()}
                </p>
                <p className="text-gray-900 font-medium">
                  {savedVehicle.number}
                </p>
              </div>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                Active
              </span>
            </div>
          </div>
        )}

        {/* Add Vehicle */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Add Vehicle
          </h2>

          <label className="block text-sm text-gray-700 mb-1">
            Vehicle type
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="mb-4 w-full rounded-md border px-3 py-2 text-gray-900"
          >
            <option value="">Select vehicle</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>

          <label className="block text-sm text-gray-700 mb-1">
            Vehicle number
          </label>
          <input
            type="text"
            placeholder="KA01AB1234"
            value={vehicleNumber}
            onChange={(e) =>
              setVehicleNumber(e.target.value.toUpperCase())
            }
            className="mb-4 w-full rounded-md border px-3 py-2 text-gray-900"
          />

          <label className="block text-sm text-gray-700 mb-1">
            Driving license number
          </label>
          <input
            type="text"
            placeholder="As printed on license"
            value={licenseNumber}
            onChange={(e) =>
              setLicenseNumber(e.target.value.toUpperCase())
            }
            className="mb-4 w-full rounded-md border px-3 py-2 text-gray-900"
          />

          {error && (
            <p className="text-sm text-red-600 mb-3">{error}</p>
          )}

          <button
            onClick={handleSave}
            className="w-full rounded-md bg-black px-4 py-2 text-white"
          >
            Save Vehicle
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full rounded-md border border-red-300 py-2 text-red-600"
        >
          Logout
        </button>
      </div>
    </main>
  );
}