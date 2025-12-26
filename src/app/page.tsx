"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white px-4 pt-10 pb-24">

      <div className="max-w-md mx-auto text-center">

        {/* Welcome Card */}
        <div className="rounded-2xl bg-indigo-50 p-6 mb-10 shadow-sm">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            Share your ride. Save fuel.
          </h1>

          <p className="text-gray-700 text-base mb-3 leading-relaxed">
            Travelling somewhere? Find people going your way and
            share the journey — for short commutes or long trips.
          </p>

          <p className="text-sm text-gray-600">
            Bikes and cars · Real people · No drivers
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <a
            href="/offer"
            className="block w-full bg-[linear-gradient(90deg,#5170ff,#ff66c4)] text-white py-3 rounded-lg text-center"
          >
            Offer a Ride
          </a>

          <a
            href="/book"
            className="block w-full bg-black text-white py-3 rounded-lg text-center"
          >
            Find a Ride
          </a>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-200" />

        {/* Info */}
        <p className="text-sm text-gray-500 leading-relaxed">
          Toggyride is a peer-to-peer ride sharing app.  
          No drivers. No surge pricing.  
          Just people travelling the same way.
        </p>
      </div>
    </main>
  );
}