"use client";

import React from 'react'
import Link from 'next/link'


const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen p-6 space-y-8 flex flex-col">
        <h2 className="font-bold bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent tracking-tight text-3xl">Taskly</h2>
        <nav className="flex flex-col gap-3 w-60">
            <Link href="/dashboard/todo" className='flex gap-2 px-4 py-2 rounded-lg text-zinc-300 text-xl hover:bg-white/10 hover:text-white transition-all'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            All todos</Link>
            <Link href="/dashboard/important" className='flex gap-2 px-4 py-2 rounded-lg text-zinc-300 text-xl hover:bg-white/10 hover:text-white transition-all'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            Important</Link>
            <Link href="/dashboard/completed" className='flex gap-2 px-4 py-2 rounded-lg text-zinc-300 text-xl hover:bg-white/10 hover:text-white transition-all'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Completed</Link>
        </nav>
    </div>
  )
}

export default Sidebar
