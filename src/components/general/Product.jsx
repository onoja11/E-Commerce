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

    // <div className="group relative product-card fade-in">
    //                 <div className="w-full h-50 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80">
    //                     <img src={pic} alt="Cap example" className="w-full h-full object-center object-cover"/>
    //                 </div>
    //                 <div className="mt-4 flex justify-between">
    //                     <div>
    //                         <h3 className="text-sm text-gray-700">
    //                             <a href="#">
    //                                 <span aria-hidden="true" className="absolute inset-0"></span>
    //                                 {name}
    //                             </a>
    //                         </h3>
    //                         <p className="mt-1 text-sm text-gray-500">{color}</p>
    //                     </div>
    //                     <p className="text-sm font-medium text-gray-900">{price}</p>
    //                 </div>
    //                 <button className="mt-4 w-full bg-black text-white py-2 rounded  hover:bg-red-900 transition duration-300 flex align-middle justify-center "><BiCartAdd/> Add to Cart</button>
    //             </div> 
                 )
}

export default Product