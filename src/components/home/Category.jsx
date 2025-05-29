import React from 'react'

const Category = ({category, pic, description}) => {
  return (
<div className="group relative fade-in" >
                    <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 transition duration-300">
                        <img alt="Sports caps" src={pic} className="w-full h-full object-center object-cover"/>
                    </div>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">
                        <a href="#" className="hover:text-slate-600 transition duration-300">
                            {category}
                        </a>
                    </h3>
                    <p className="text-base text-gray-500">{description}</p>
                </div> 
                 )
}

export default Category