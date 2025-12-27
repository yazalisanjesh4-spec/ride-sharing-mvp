"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 pt-10 pb-24">
      <div className="max-w-md mx-auto text-center">

        {/* Message */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Going the same way? Ride together.
        </h1>

        <p className="text-gray-700 text-base mb-10 leading-relaxed">
          Share bike or car rides with people travelling on the same
          route and split fuel costs.
        </p>

        {/* Action buttons */}
        <div className="space-y-4">
          <a
            href="/offer"
            className="block w-full bg-indigo-600 text-white py-3 rounded-lg text-center"
          >
            Offer a Ride
          </a>

          <a
            href="/book"
            className="block w-full bg-purple-600 text-white py-3 rounded-lg text-center"
          >
            Find a Ride
          </a>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-200" />

        {/* Info */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Toggyride is a peer-to-peer ride sharing app.  
          No drivers. No surge pricing.  
          Just people travelling the same way.
        </p>
      </div>
    </main>
  );
}