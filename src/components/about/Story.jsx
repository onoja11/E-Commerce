import React from 'react'
import Values from './Values'
import Stats from './Stats'

const Story = () => {
  return (
    <>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                    <p>
                        Founded in 2020, koveCaps emerged from a simple belief: headwear should be more than just an accessory. 
                        It should be an extension of who you are, a statement of your individuality, and a testament to quality craftsmanship.
                    </p>
                    <p>
                        What started as a small passion project in a garage has evolved into a brand trusted by style enthusiasts 
                        worldwide. We've maintained our commitment to handcrafted excellence while embracing innovative design 
                        and sustainable practices.
                    </p>
                    <p>
                        Today, koveCaps represents the perfect fusion of timeless style and contemporary edge, creating pieces 
                        that stand the test of time both in durability and design.
                    </p>
                </div>
            </div>
            <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <div className="w-48 h-48 bg-black rounded-full flex items-center justify-center shadow-2xl">
                        <svg className="w-24 h-24 text-white rotate-side-to-side" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>     
        <Values/>
        <Stats/>
    </div>
     <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Redefine Your Style?</h2>
            <p className="text-lg text-gray-600 mb-8">
                Discover our collection of handcrafted caps designed for comfort, style, and durability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Shop Now
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    View Collections
                </button>
            </div>
        </div>
    </div>
    </>
   )
}

export default Story