import React from 'react'
import SideBar from '../../components/admin/SideBar'

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
     {/* sidebar */}
     <SideBar className="fixed"/>
      <div className="flex-grow p-6 bg-gray-100">
        {/* Main content goes here */}
        
        <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
        {/* Add more dashboard components as needed */}
      </div>
    </div>
)
}

export default Dashboard