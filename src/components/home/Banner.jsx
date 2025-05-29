import React from 'react'

const Banner = () => {
  return (
  <div className="banner py-12 bg-black sm:py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl fade-in">
                    New Collection Launch
                </h2>
                <p className="mt-4 max-w-2xl text-xl text-white mx-auto fade-in">
                    Be the first to get our exclusive summer collection.
                </p>
                <div className="mt-8 fade-in">
                    <a href="#" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition duration-300">
                        Explore Now
                    </a>
                </div>
            </div>
        </div>
    </div>  )
}

export default Banner