import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/ui/heropage";

export default function Home() {
  return (
    <main className="relative">
      {/* Background Hero Component */}
      <HeroSection />

      {/* Overlaid Navigation Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none">
        {/* We use pointer-events-none on the container so the Hero button remains clickable,
            but pointer-events-auto on the children below. */}

        <div className="pointer-events-auto flex flex-col gap-6 mt-20">
          <div className="flex gap-4 justify-center mt-56">
            <Link href="/signup">
              <button className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-2xl px-6 py-3 text-center">
                Sign Up
              </button>
            </Link>

            <Link href="/login" className="flex flex-col items-center gap-1">
              <button className="text-2xl px-6 py-3 bg-zinc-800 text-white rounded-full font-medium border border-zinc-700 hover:bg-zinc-700 transition-all transform hover:scale-105 shadow-lg">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
