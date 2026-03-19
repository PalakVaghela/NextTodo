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
      console.log("");
      return;
    }
    console.log("everythinf is okay");
    router.refresh();
    router.push("/dashboard/todo");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-indigo-950 to-purple-950">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-700 rounded-full mix-blend-soft-light filter blur-xl opacity-70" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-700 rounded-full mix-blend-soft-light filter blur-xl opacity-70" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-700 rounded-full mix-blend-soft-light filter blur-xl opacity-70" />
      </div>

      <div className="relative">
        <div className={`flex flex-col items-center gap-5 px-15 py-18 rounded-4xl bg-zinc-900/50 backdrop-blur-sm
                      shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]`}>
          <h1 className="text-3xl text-center font-semibold mb-4">Login</h1>

          <form onSubmit={handleLogin} className="flex flex-col items-center gap-5">
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

            {error && <p className="text-red-500 text-xl max-w-4xs text-center">{error}</p>}

            <button
              className={`px-8.75 py-2.5 bg-[#212121] text-white font-bold text-xl rounded-md border-2 border-[#212121] cursor-pointer transition-all duration-300
                             shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                             hover:scale-105 hover:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]
                             focus:scale-105`}
              type="submit"
            >
              Login
            </button>

            <p className="text-xl mt-3 text-center">
              No account?{" "}
              <Link href="/signup" className="text-blue-400">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
