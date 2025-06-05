import React from 'react'
import { Layers, Globe } from 'lucide-react'

const Filter = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
  return (
  <div className="flex overflow-auto sticky top-20 z-10 md:justify-center md:gap-4 gap-2 mb-16"> 
                <button className="category-btn cursor-pointer px-6 md:py-3 bg-white/30 rounded-full text-white text-sm font-medium hover:bg-white/60 hover:bg-opacity-20 hover:text-black focus:outline-none focus:ring-1 focus:ring-gray-200">
                    <Layers/>
                </button>
                <button className="category-btn cursor-pointer px-6 py-3 bg-white/30 rounded-full text-white font-medium hover:bg-white/60 hover:text-black hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Baseball
                </button>
                <button className="category-btn cursor-pointer px-6 py-3 bg-white/30 rounded-full text-white font-medium hover:bg-white/60 hover:text-black hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Snapback
                </button>
                <button className="category-btn cursor-pointer px-6 py-3 bg-white/30 rounded-full text-white font-medium hover:bg-white/60 hover:text-black hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Trucker
                </button>
                <button className="category-btn cursor-pointer px-6 py-3 bg-white/30 rounded-full text-white font-medium hover:bg-white/60 hover:text-black hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Vintage
                </button>
            </div>
              )
}

export default Filter