"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginWithEmail, signInWithGoogle } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginWithEmail(email, password);
      router.push("/"); // ✅ HOME REDIRECT
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/"); // ✅ HOME REDIRECT
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-2xl font-semibold text-black">
          Login
        </h1>

        <label className="mb-1 block text-sm text-black">Email</label>
        <input
          type="email"
          className="mb-3 w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mb-1 block text-sm text-black">Password</label>
        <input
          type="password"
          className="mb-4 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mb-3 w-full rounded bg-black py-2 text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="text-gray-950 mb-3 w-full rounded border py-2"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-black">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}