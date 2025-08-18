import React from 'react'
import { ShoppingCart, Eye,SquarePen,Trash2 } from "lucide-react"
import { Link } from 'react-router-dom'; 

const Product = ({id, name, description, route,preview, actionButtons, addToCart, category, pic, price, border, stock, textColor = 'text-white', handleAddToCart,onDelete,onEdit }) => {
  return (
    <div className={`${border} stagger-animation cursor-pointer glass-effect rounded-2xl overflow-hidden group`}>
      <div className="image-placeholder h-64 relative">
        <div className="absolute overflow-hidden inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          {/* Category badge */}
          <div className="absolute z-10 top-3 right-3 bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 text-white text-xs font-semibold rounded-full shadow-lg border border-white/20 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
            {category}
          </div>

          {/* Product Image */}
          <img className='w-full h-full object-center group-hover:scale-105 object-cover transition-transform duration-300' src={pic} alt={name} />

          {/* Preview Button */}
          <div className={ `absolute ${preview} inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30`}>
            <Link to={`/caps/${route}`} className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm animate-bounce">
              <Eye className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className={`${textColor} font-semibold text-lg mb-2`}>{name}</h3>
        <p className="text-gray-400 text-sm mb-2">{description}</p>
        <p className="text-xs text-gray-500 mb-4">Stock: {stock}</p>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-bold text-xl">{price}</span>
          <button 
            onClick={handleAddToCart} 
            className={`flex ${addToCart} items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors duration-200`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <div className={`flex ${actionButtons}  gap-2 items-center`}>
            <button 
            onClick={() => onDelete(id)} 
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onEdit(id)} 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors duration-200"
          >
            <SquarePen className="w-4 h-4" />
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
