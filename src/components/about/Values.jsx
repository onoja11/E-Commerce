import React from 'react'

const Values = () => {
  return (
      <div className="mb-24">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Quality First</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Every koveCap is meticulously crafted using premium materials and time-tested techniques, 
                        ensuring durability that lasts for years.
                    </p>
                </div>
                
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainable Style</h3>
                    <p className="text-gray-600 leading-relaxed">
                        We're committed to responsible manufacturing practices and eco-friendly materials, 
                        creating fashion that's kind to both you and the planet.
                    </p>
                </div>
                
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
                    <p className="text-gray-600 leading-relaxed">
                        We constantly push boundaries in design and functionality, creating caps that are both 
                        timeless and cutting-edge.
                    </p>
                </div>
            </div>
        </div>
  )
}

export default Values