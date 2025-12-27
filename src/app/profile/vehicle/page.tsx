"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VehiclePage() {
  const router = useRouter();

  const [vehicleType, setVehicleType] = useState<"bike" | "car" | "">("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const hasSavedVehicle =
    vehicleType && vehicleNumber && licenseNumber;

  return (
    <main className="min-h-screen bg-white px-4 pt-6 pb-28">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="text-xl"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Vehicle & License
          </h1>
        </div>

        {/* Saved Vehicle */}
        {hasSavedVehicle && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-500 mb-2">
              Saved vehicle
            </p>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">
                  {vehicleType === "bike" ? "🏍 Bike" : "🚗 Car"}
                </p>
                <p className="text-sm text-gray-600">
                  {vehicleNumber}
                </p>
              </div>

              <span className="text-green-600 text-sm font-medium">
                ✓ Verified
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Vehicle type
            </label>

            <div className="flex gap-4">
              <button
                onClick={() => setVehicleType("bike")}
                className={`flex-1 rounded-lg border py-3 font-medium ${
                  vehicleType === "bike"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                🏍 Bike
              </button>

              <button
                onClick={() => setVehicleType("car")}
                className={`flex-1 rounded-lg border py-3 font-medium ${
                  vehicleType === "car"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                🚗 Car
              </button>
            </div>
          </div>

          {/* Vehicle Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Vehicle number
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) =>
                setVehicleNumber(e.target.value.toUpperCase())
              }
              placeholder="KA 05 AB 1234"
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* License Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Driving license number
            </label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) =>
                setLicenseNumber(e.target.value.toUpperCase())
              }
              placeholder="DL-0420110149646"
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Save */}
          <button
            onClick={() => {
              if (!vehicleType || !vehicleNumber || !licenseNumber) {
                alert("Please fill all vehicle and license details");
                return;
              }

              localStorage.setItem(
                "vehicleDetails",
                JSON.stringify({
                  vehicleType,
                  vehicleNumber,
                  licenseNumber,
                })
              );

              alert("Vehicle details saved");
              router.back();
            }}
            className="mt-4 w-full rounded-lg bg-black py-3 text-white font-medium"
          >
            Save details
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
          Your vehicle and license details are used only to build trust
          between riders. They are never shared publicly.
        </p>
      </div>
    </main>
  );
}