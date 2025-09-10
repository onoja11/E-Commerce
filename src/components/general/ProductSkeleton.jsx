import React from 'react'

const ProductSkeleton = () => {
  return (
<div className="border border-gray-200 shadow-lg cursor-pointer glass-effect rounded-2xl overflow-hidden group relative animate-pulse">
      {/* Image Placeholder */}
      <div className="h-64 relative bg-gradient-to-br from-gray-200 to-gray-300">
        {/* Category Badge Placeholder */}
        <div className="absolute z-10 top-3 right-3 w-20 h-6 bg-gray-400 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name */}
        <div className="h-5 bg-gray-400 rounded w-3/4 mb-3"></div>
        {/* Description */}
        <div className="h-4 bg-gray-400 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-400 rounded w-5/6 mb-4"></div>
        {/* Stock */}
        <div className="h-3 bg-gray-500 rounded w-1/4 mb-4"></div>
        <div className="flex justify-between items-center">
          {/* Price Placeholder */}
          <div className="h-6 bg-gray-400 rounded w-20"></div>
          {/* Add to Cart Button Placeholder */}
          <div className="h-8 bg-gray-500 rounded-lg w-24"></div>

         
        </div>
      </div>
             </div>  )
}

export default ProductSkeleton