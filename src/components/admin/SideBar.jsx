import React from 'react'

const SideBar = () => {
  return (
     <div className="w-full md:w-64 bg-black bg-opacity-50 backdrop-blur-sm border-r border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-white mb-8">Caps Admin</h1>
        <nav className="space-y-2">
          <a href="#" className="nav-link flex items-center text-white font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors active">
            <span className="mr-3">📊</span> Dashboard
          </a>
          <a href="#" className="nav-link flex items-center text-white font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <span className="mr-3">👥</span> Users
          </a>
          <a href="#" className="nav-link flex items-center text-white font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <span className="mr-3">🧢</span> Products
          </a>
          <a href="#" className="nav-link flex items-center text-white font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <span className="mr-3">📂</span> Categories
          </a>
          <a href="#" className="nav-link flex items-center text-white font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <span className="mr-3">📦</span> Orders
          </a>
          <a href="#" className="nav-link flex items-center text-white font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <span className="mr-3">📈</span> Analytics
          </a>
          <a href="#" className="nav-link flex items-center text-white font-bold p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <span className="mr-3">⚙️</span> Settings
          </a>
        </nav>
      </div>
  )
}

export default SideBar