"use client";

import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="w-64 border-r p-4 space-y-4">
        <h2 className="text-xl font-bold">Todod App</h2>
        <nav className="flex flex-col gap-3">
            <Link href="/dashboard/todo">All todos</Link>
            <Link href="/dashboard/important">Important</Link>
            <Link href="/dashboard/completed">Complated</Link>
        </nav>
    </div>
  )
}

export default Sidebar
