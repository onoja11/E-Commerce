import React from 'react';
import { Link } from 'react-router-dom';


const Category = ({category, pic}) => {
  return (
<div className="group cursor-pointer relative  fade-in" >
   
                    <div className="relative w-full h-80 bg-white rounded-4xl overflow-hidden group-hover:opacity-75 transition duration-300">
                        <img alt="Sports caps" src={pic} className="w-full h-full group-hover:scale-125 transition duration-300  group-hover:rotate-6 object-center object-cover"/>
                    </div>
                    <h3 className="mt-6 flex justify-center text-xl font-medium text-gray-900">
                        <Link to={`/search?query=${category}`} className="hover:text-slate-600  font-bold transition duration-300">
                            {category}
                        </Link>
                    </h3>
                </div> 
                 )
}

export default Category