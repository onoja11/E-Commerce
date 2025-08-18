import React from 'react'
import { ArrowDown } from 'lucide-react';
import Hero from '../components/general/Hero'
import Filter from '../components/caps/Filter'
import MainContent from '../components/caps/MainContent'

const Caps = () => {
    
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
      <div className="text-center md:py-24 px-4 sm:px-6 lg:px-8">
    <Hero heading={'Premium Collection'} description={'                Discover our premium collection of stylish caps, crafted for the modern individual'} />
     <a href="#collection" className="inline-flex gap-2  items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-600 rounded-full text-white font-semibold hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl test" >
                  <ArrowDown className="animate-bounce " />
                Explore Collection
            </a>

      </div>
    {/* <Filter />     */}
    <MainContent />
    </div>

  )
}

export default Caps