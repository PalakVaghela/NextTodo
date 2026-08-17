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

  // the signup page
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

    //signup success
    alert("Check your email for verification");
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-indigo-950 to-purple-950">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-700 rounded-full mix-blend-soft-light filter blur-xl opacity-70" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-700 rounded-full mix-blend-soft-light filter blur-xl opacity-70" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-700 rounded-full mix-blend-soft-light filter blur-xl opacity-70" />
      </div>

      <div className="relative">
        <div
          className={`flex flex-col items-center gap-5 px-15 py-18 rounded-4xl bg-zinc-900/50 backdrop-blur-sm
                      shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]`}
        >
          <h1 className="text-4xl font-semibold pb-2 text-white">Sign Up</h1>

          <form
            onSubmit={handleSignup}
            className="flex flex-col items-center gap-5">
            {/* Neumorphic Input Style */}
            <input
              type="text"
              placeholder="Name"
              className={`w-3xs min-h-12 bg-[#212121] text-white outline-none px-2 rounded-md border-2 border-[#212121] transition-all duration-300
                       placeholder:text-zinc-500 focus:placeholder:opacity-0 focus:scale-105
                       shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                       focus:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className={`w-3xs min-h-12 bg-[#212121] text-white outline-none px-2 rounded-md border-2 border-[#212121] transition-all duration-300
                       placeholder:text-zinc-500 focus:placeholder:opacity-0 focus:scale-105
                       shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                       focus:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className={`w-3xs min-h-12 bg-[#212121] text-white outline-none px-2 rounded-md border-2 border-[#212121] transition-all duration-300
                       placeholder:text-zinc-500 focus:placeholder:opacity-0 focus:scale-105
                       shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                       focus:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-xl max-w-3xs text-center">
                {error}
              </p>
            )}

            {/* Neumorphic Button */}
            <button
              className={`px-4 py-2.5 bg-[#212121] text-white font-bold text-xl rounded-md border-2 border-[#212121] cursor-pointer transition-all duration-300
                             shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                             hover:scale-105 hover:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]
                             focus:scale-105`}
            >
              Sign Up
            </button>

            <p className="text-xl text-white mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
