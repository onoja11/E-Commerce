import React from 'react'
import { PiCarThin } from 'react-icons/pi'
import { BiCartAdd } from 'react-icons/bi'

const Product = ({name , description , pic, price,border,stock, textColor = 'text-white'}) => {
  return (
<div className={`${border} stagger-animation cursor-pointer    glass-effect rounded-2xl overflow-hidden group`}>
                    <div className="image-placeholder h-64 relative">
                        <div className="absolute overflow-hidden inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            {/* <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg> */}
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 text-white text-xs font-semibold rounded-full shadow-lg border border-white/20 backdrop-blur-sm animate-pulse">
                                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
                                ACTIVE
                            </div>
                            <img className='w-full h-full object-center  group-hover:scale-105 object-cover' src={pic} alt="" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                        <h3 className={`${textColor} font-semibold text-lg mb-2`}>{name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{description}</p>
                            <span className="text-gray-400 font-bold text-xl">{stock}</span>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-bold text-xl">{price}</span>
                            <a href="/preview" className="px-4 py-2 cursor-pointer bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors duration-200">
                                Add to Cart
                            </a>
                        </div>
                    </div>
                </div>
                 )
}

export default Product