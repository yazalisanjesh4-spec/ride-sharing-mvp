export default function ProfilePage() {
  // Mock user (later from Firebase)
  const user = {
    username: "sanjesh",
    gender: "Male",
  };

  return (
    <main className="min-h-screen bg-white px-4 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Profile
        </h1>

        {/* User Info Card */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-gray-900 font-medium">
              {user.username}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="text-gray-900 font-medium">
              {user.gender}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full border border-red-300 text-red-600 py-2 rounded-lg">
          Logout
        </button>
      </div>
    </main>
  );
}