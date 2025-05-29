import React from 'react'
import { PiCarThin } from 'react-icons/pi'
import { BiCartAdd } from 'react-icons/bi'

const Product = ({name , color , pic, price}) => {
  return (
    <div className="group relative product-card fade-in">
                    <div className="w-full h-50 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80">
                        <img src={pic} alt="Cap example" className="w-full h-full object-center object-cover"/>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                                <a href="#">
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    {name}
                                </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{color}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{price}</p>
                    </div>
                    <button className="mt-4 w-full bg-black text-white py-2 rounded  transition duration-300 flex align-middle justify-center "><BiCartAdd/> Add to Cart</button>
                </div>  )
}

export default Product