"use client";

import { useState } from "react";
import Link from "next/link";
import { signupWithEmail, signInWithGoogle } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    try {
      setLoading(true);
      await signupWithEmail(email, password);
      alert("Account created successfully");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    try {
      setLoading(true);
      await signInWithGoogle();
      alert("Signed up with Google");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-200">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-semibold text-black">
          Create account
        </h1>

        <label className="mb-1 block text-sm text-gray-700">Email</label>
        <input
          className="mb-4 w-full rounded border p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mb-1 block text-sm text-gray-700">Password</label>
        <input
          className="mb-4 w-full rounded border p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="mb-3 w-full rounded bg-black py-2 text-white"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className=" text-gray-950 mb-4 w-full rounded border py-2"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}