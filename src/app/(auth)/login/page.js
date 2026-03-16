"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    console.log("email", email);
    console.log("password", password);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("USER ERROR:", error);


    if (error) {
      setError(error.message);
      console.log("")
      return;
    }
    console.log("everythinf is okay")
    router.refresh();
    router.push('/dashboard/todo')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="p-6 rounded-lg shadow-md w-96">
        <h1 className="text-3xl text-center font-semibold mb-4">Login</h1>

        <form onSubmit={handleLogin}>
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

          <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
            Login
          </button>

          <p className="mt-3 text-center">
            No account?{" "}
            <Link href="/signup" className="text-blue-400">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
