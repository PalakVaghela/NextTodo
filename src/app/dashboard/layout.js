import React from 'react'
import Sidebar from '../components/Sidebar'

const Layout = ({children}) => {
  return (
    <div className="flex min-h-screen">

      <Sidebar/>

      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  )
}

export default Layout
