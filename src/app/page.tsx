import { useFirebaseTest } from "@/hooks/useFirebaseTest";
export default function HomePage() {
  "use client";
  return (
    <main className="min-h-screen bg-white px-4 pt-10 pb-24">
      <div className="max-w-md mx-auto text-center">
        {/* Welcome */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Welcome 👋
        </h1>

        {/* Tagline */}
        <p className="text-gray-600 text-base mb-8">
          Travelling somewhere?  
          Share your ride, split petrol costs, and travel together.
        </p>

        {/* Action buttons */}
        <div className="space-y-4">
          <a
            href="/offer"
            className="block w-full bg-gray-900 text-white py-3 rounded-lg text-center"
          >
            Offer a Ride
          </a>

          <a
            href="/book"
            className="block w-full border border-gray-300 text-gray-900 py-3 rounded-lg text-center"
          >
            Find a Ride
          </a>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-200" />

        {/* Info */}
        <p className="text-sm text-gray-500">
          This is a peer-to-peer ride sharing app.  
          No drivers. No surge pricing.  
          Just people travelling the same way.
        </p>
      </div>
    </main>
  );
}