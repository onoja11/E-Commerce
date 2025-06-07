import React from 'react'

const Preview = () => {
  return (
 <section className="relative pt-24  pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-gray-900/20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* <!-- Product Images      */}
                <div className="relative ">
                    <div className="absolute  bg-gradient-to-r from-gray-600 via-gray-300    to-gray-600 rounded-3xl blur-xl opacity-30  "></div>
                    <div className="relative    bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-3 card-hover">
                        <div className="aspect-square  relative overflow-hidden rounded-2xl ">
                            {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div> */}
                            <img src="/pexels-dzeninalukac-1376049.jpg"
                             alt="Urban Snapback" className="w-full h-full  object-cover"/>
                            <div className="absolute animate-bounce transition-all duration-200 top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold pulse-ring">
                                NEW
                            </div>
                        </div>
                        
                        
                    </div>
                </div>

                {/* <!-- Product Details     */}
                <div className="space-y-8">
                    {/* <!-- Product Title & Rating      */}
                    <div>
                        <h1 className="text-5xl font-black mb-4">
                            <span className="gradient-text">Urban</span> Snapback
                        </h1>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex items-center space-x-1">
                                <div className="flex text-yellow-400 text-xl">★★★★★</div>
                                <span className="text-gray-300 ml-2">(4.9)</span>
                            </div>
                            <div className="h-4 w-px bg-gray-600"></div>
                            <span className="text-gray-400 font-semibold">250+ sold today</span>
                        </div>
                    </div>

                    {/* <!-- Price   */}
                    <div className="relative">
                        <div className="flex items-center space-x-4">
                            <span className="text-4xl font-bold bg-black bg-clip-text text-transparent">$34.99</span>
                            <span className="text-xl text-gray-400 line-through">$49.99</span>
                            <div className="bg-gradient-to-r from-gray-400 to-slate-400 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                                30% OFF
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">Price drops to $29.99 when you buy 2+</p>
                    </div>

                  

                    {/* <!-- Quantity & Add to Cart      */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Quantity</label>
                                <div className="flex items-center bg-gray-900 text-gray-200 rounded-xl border border-gray-700">
                                    <button className="px-4 py-3 hover:bg-gray-800 transition-colors rounded-l-xl font-bold text-xl">−</button>
                                    <div className="px-6 py-3 border-x border-gray-700 font-bold">1</div>
                                    <button className="px-4 py-3 hover:bg-gray-800 transition-colors rounded-r-xl font-bold text-xl">+</button>
                                </div>
                            </div>
                            <div className="text-sm">
                                <div className="text-green-400 font-semibold">✓ In Stock</div>
                                <div className="text-gray-400">Only 8 left!</div>
                            </div>
                        </div>

                        {/* <!-- Action Buttons      */}
                        <div className="space-y-4">
                            <button className="w-full bg-gradient-to-r from-gray-700 via-gray-500 to-slate-800 hover:from-gray-700 hover:via-gray-600 hover:to-slate-500 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl neon-glow">
                                Add to Cart • $34.99
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all">
                                    ♡ Wishlist
                                </button>
                                <button className="bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all">
                                    📱 Share
                                </button>
                            </div>
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    </section>
)
}

export default Preview