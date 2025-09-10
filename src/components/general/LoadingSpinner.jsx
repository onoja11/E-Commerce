import React from 'react'

const LoadingSpinner = () => {
  return (
 <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-black to-slate-500 rounded-2xl flex items-center justify-center animate-pulse shadow-xl">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-black/20 to-slate-500/20 rounded-2xl animate-ping"></div>
        </div>
      </div>
    </div>
      )
}

export default LoadingSpinner