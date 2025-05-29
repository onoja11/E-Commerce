import React from 'react'

const Hero = () => {
  return (
 <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    About <span className="text-gray-300">koveCaps</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Crafting premium headwear that defines your style and speaks to your personality. 
                    Every cap tells a story, and we're here to help you tell yours.
                </p>
            </div>
        </div>
        
        {/* <!-- Decorative elements --> */}
        <div className="absolute top-20 left-10 w-32 h-32  animate-bounce bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 animate-bounce bg-white opacity-10 rounded-full"></div>
    </div>  )
}

export default Hero