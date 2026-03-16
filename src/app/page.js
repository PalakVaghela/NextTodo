import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Image src="/homepage.png" alt="Todo App" className="object-fill" fill/>
      <h1 className="text-3xl font-bold">Welcome to Todo App</h1>
           <div className="absolute inset-0 bg-zinc-950"></div>

      {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-white text-center gap-4">
            <h1 className="text-4xl font-bold">Welcome to Todo App</h1>

            <Link href="/signup">
                <button className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition">
                    Sign Up
                </button>
            </Link>
            <Link href="/login">
                <h2>Already have account</h2>
                <button className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition">
                    Login
                </button>
            </Link>
        </div>

    </div>
  );
}
