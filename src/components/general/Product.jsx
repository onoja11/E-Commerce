import React from 'react'
import { ShoppingCart, Eye, SquarePen, Trash2 } from "lucide-react"
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import axios from '../../api/axios'

const Product = ({ 
  id, 
  name, 
  description, 
  route, 
  preview, 
  actionButtons, 
  addToCartBtn,
  category,
  quantity, 
  pic, 
  price, 
  border, 
  stock, 
  textColor = 'text-white', 
  onDelete, 
  onEdit 
}) => {
  const { addToCart } = useCart();
  const imageBaseUrl = axios.defaults.baseURL + '/storage/'; 
  const isOutOfStock = stock < 1;
   const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className={`${border} stagger-animation cursor-pointer glass-effect rounded-2xl overflow-hidden group relative ${isOutOfStock ? 'opacity-75' : ''}`}>
      <div className="image-placeholder h-64 relative">
        <div className="absolute overflow-hidden inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="absolute z-10 top-3 right-3 bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 text-white text-xs font-semibold rounded-full shadow-lg border border-white/20 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
            {category}
          </div>

          <img 
            className={`w-full h-full object-center object-cover transition-transform duration-300 ${
              isOutOfStock ? 'grayscale group-hover:scale-100' : 'group-hover:scale-105'
            }`} 
            src={imageBaseUrl + pic} 
            alt={name} 
          />

          {/* Enhanced Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
              <div className="text-center">
                <div className="bg-black/85 backdrop-blur-sm px-6 py-3 rounded-xl border-2 border-black shadow-2xl">
                  <p className="text-white font-bold text-lg tracking-wide">OUT OF STOCK</p>
                  <p className="text-red-100 text-xs mt-1">Currently Unavailable</p>
                </div>
              </div>
            </div>
          )}

          <div className={`absolute ${preview} inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${isOutOfStock ? 'bg-black/50' : 'bg-black/30'}`}>
            <Link 
              to={!isOutOfStock ? `/caps/${route}`: `#`} 
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm animate-bounce"
            >
              <Eye className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className={`${textColor} font-semibold text-lg mb-2 ${isOutOfStock ? 'opacity-75' : ''}`}>
          {name}
        </h3>
        <p className={`text-gray-400 text-sm mb-2 ${isOutOfStock ? 'opacity-75' : ''}`}>
          {description}
        </p>
        <p className={`text-xs mb-4 ${isOutOfStock ? 'text-red-400 font-semibold' : 'text-gray-500'}`}>
          {!quantity ? `Stock: ${stock}` : `Quantity: ${quantity}`}
        </p>

        <div className="flex justify-between items-center">
          <span className={`font-bold text-xl ${isOutOfStock ? 'text-gray-500 line-through' : 'text-gray-400'}`}>
            {formatCurrency(Number(price).toLocaleString())}
          </span>

          <button
            onClick={() => !isOutOfStock && addToCart({ id, name, price, image: pic, quantity: 1, stock })}
            disabled={isOutOfStock}
            className={`flex ${addToCartBtn} items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
              isOutOfStock 
                ? 'bg-gray-500 cursor-not-allowed opacity-50 text-gray-300' 
                : 'bg-gray-600 hover:bg-gray-700 text-white hover:shadow-lg transform hover:scale-105'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>

          <div className={`flex ${actionButtons} gap-2 items-center`}>
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