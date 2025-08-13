import React from 'react'
import Hero from '../components/general/Hero'
import Filter from '../components/caps/Filter'
import MainContent from '../components/caps/MainContent'

const Caps = () => {
    
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
      <div className="text-center md:py-24 px-4 sm:px-6 lg:px-8">
    <Hero heading={'Premium Collection'} description={'                Discover our premium collection of stylish caps, crafted for the modern individual'} />
     <a href="#collection" className="inline-flex  items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-600 rounded-full text-white font-semibold hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl test" >
                Explore Collection
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </a>

      </div>
    {/* <Filter />     */}
    <MainContent />
    </div>

  )
}

export default Caps