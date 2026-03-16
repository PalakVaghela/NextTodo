"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";


export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // stored in auth.users metadata
        },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    // ✅ signup success
    alert("Check your email for verification");
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="p-6 rounded-lg shadow-md w-96">
        <h1 className="text-3xl text-center font-semibold mb-4">Sign Up</h1>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Sign Up
          </button>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
