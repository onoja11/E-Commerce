import React from 'react'

const Preview = () => {
  return (
 <section className="relative pt-24  pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-gray-900/20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* <!-- Product Images      */}
                <div className="relative ">
                    <div className="absolute bg-gradient-to-r from-gray-600 via-gray-300    to-gray-600 rounded-3xl blur-xl opacity-30  "></div>
                    <div className="relative     bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 card-hover">
                        <div className="aspect-square  relative overflow-hidden rounded-2xl mb-6">
                            {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div> */}
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFmMjkzNztzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMzc0MTUxO3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNTAiIHI9IjE1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2NmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuMyIvPgo8dGV4dCB4PSIyNTAiIHk9IjI2MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5VcmJhbiBTbmFwYmFjazwvdGV4dD4KPC9zdmc+"
                             alt="Urban Snapback" className="w-full h-full  object-cover"/>
                            <div className="absolute animate-bounce transition-all duration-200 top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold pulse-ring">
                                NEW
                            </div>
                        </div>
                        
                        {/* <!-- Thumbnail Gallery   */}
                        <div className="grid grid-cols-4  gap-3 ">
                            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden cursor-pointer border-2 border-purple-500 hover:scale-105 transition-transform">
                                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-xs">Main</div>
                            </div>
                            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden cursor-pointer hover:border-purple-500 border-2 border-transparent hover:scale-105 transition-all">
                                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-xs">Side</div>
                            </div>
                            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden cursor-pointer hover:border-purple-500 border-2 border-transparent hover:scale-105 transition-all">
                                <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center text-xs">Back</div>
                            </div>
                            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden cursor-pointer hover:border-purple-500 border-2 border-transparent hover:scale-105 transition-all">
                                <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center text-xs">Top</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Product Details     */}
                <div className="space-y-8">
                    {/* <!-- Product Title & Rating      */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">TRENDING</span>
                            <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">LIMITED</span>
                        </div>
                        <h1 className="text-5xl font-black mb-4">
                            <span className="gradient-text">Urban</span> Snapback
                        </h1>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex items-center space-x-1">
                                <div className="flex text-yellow-400 text-xl">★★★★★</div>
                                <span className="text-gray-300 ml-2">(4.9)</span>
                            </div>
                            <div className="h-4 w-px bg-gray-600"></div>
                            <span className="text-purple-400 font-semibold">250+ sold today</span>
                        </div>
                    </div>

                    {/* <!-- Price   */}
                    <div className="relative">
                        <div className="flex items-center space-x-4">
                            <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">$34.99</span>
                            <span className="text-xl text-gray-400 line-through">$49.99</span>
                            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                                30% OFF
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">Price drops to $29.99 when you buy 2+</p>
                    </div>

                    {/* <!-- Style Selection     */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Choose Your Vibe</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl border-2 border-purple-500 hover:from-purple-800 hover:to-purple-700 transition-all group neon-glow">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                    <div className="text-left">
                                        <div className="font-bold">Cosmic Purple</div>
                                        <div className="text-sm text-gray-400">Street Ready</div>
                                    </div>
                                </div>
                            </button>
                            <button className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-600 hover:border-gray-500 transition-all group">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full"></div>
                                    <div className="text-left">
                                        <div className="font-bold">Shadow Black</div>
                                        <div className="text-sm text-gray-400">Classic</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Quantity & Add to Cart      */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Quantity</label>
                                <div className="flex items-center bg-gray-900 rounded-xl border border-gray-700">
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
                            <button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl neon-glow">
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

                    {/* <!-- Product Features    */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">🚚</div>
                            <div>
                                <div className="font-semibold text-green-400">Free Shipping</div>
                                <div className="text-xs text-gray-400">2-3 days delivery</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">↩</div>
                            <div>
                                <div className="font-semibold text-blue-400">Easy Returns</div>
                                <div className="text-xs text-gray-400">30-day policy</div>
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