import React from 'react'
import Sidebar from '../components/Sidebar'

const Layout = ({children}) => {
  return (
    <div className="flex min-h-screen">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br bg-[#020617]"/>
        <div className="absolute inset-0 bg-grid-white/[0.01]"/>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-950 rounded-full mix-blend-screen filter blur-[128px]"/>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-fuchsia-950 rounded-full mix-blend-screen filter blur-[128px]"/>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-900 rounded-full mix-blend-screen filter blur-[128px]"/>
      </div>

      <aside className='relative z-20 h-screen w-72 shrink-0 flex flex-col bg-white/15 backdrop-blur-2xl border-r border-white/30 shadow-[4px_0_24px_rgba(0,0,0,0.3)]'>
        <Sidebar/>
      </aside>

      <main className='relative z-10 flex-1 h-screen overflow-auto p-8'>
        {children}
      </main>
    </div>
  )
}

export default Layout
