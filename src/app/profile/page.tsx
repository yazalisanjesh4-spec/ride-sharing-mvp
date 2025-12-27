"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();

  const user = {
    username: "Sanjesh",
    phone: "9666114066",
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 pt-6 pb-28">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Profile
        </h1>

        {/* User Card */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-white px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {user.username}
              </p>
              <p className="text-sm text-gray-500">
                {user.phone}
              </p>
            </div>
          </div>
          <span className="text-gray-400 text-xl">›</span>
        </div>

        {/* SETTINGS STYLE LIST */}
        <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">

          {/* My Rides */}
          <button
            onClick={() => router.push("/rides")}
            className="flex w-full items-center justify-between px-4 py-4 border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🧳</span>
              <span className="text-gray-900 font-medium">
                My Rides
              </span>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </button>

          {/* Vehicle & License */}
          <button
            onClick={() => router.push("/profile/vehicle")}
            className="flex w-full items-center justify-between px-4 py-4 border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🚗</span>
              <span className="text-gray-900 font-medium">
                Vehicle & License
              </span>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </button>

          {/* Help */}
          <button
            onClick={() => router.push("/help")}
            className="flex w-full items-center justify-between px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">❓</span>
              <span className="text-gray-900 font-medium">
                Help
              </span>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </button>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full rounded-xl border border-red-300 bg-white py-3 text-red-600 font-medium"
        >
          Logout
        </button>

      </div>
    </main>
  );
}