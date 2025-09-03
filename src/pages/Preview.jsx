import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from '../api/axios'
import { useCart } from '../context/CartContext';

const Preview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const imageBaseUrl = axios.defaults.baseURL + '/'; // Base URL for images

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data); 
      } catch (error) {
        console.error('Error fetching product:', error.response?.data || error.message);
      }
    }
    fetchProduct();
  }, [id]);

  // Handle Quantity
  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <section className="relative pt-24 pb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-gray-900/20"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Product Images */}
          <div className="relative">
            <div className="absolute bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-3 card-hover">
              <div className="aspect-square relative overflow-hidden rounded-2xl">
                <img 
                  src={imageBaseUrl + product.image}
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute animate-bounce transition-all duration-200 top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold pulse-ring">
                  {product.category?.name}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-black mb-4">
                <span className="gradient-text">{product.name}</span>
              </h1>
              <p className="mb-4">
                <span className="gradient-text">{product.description}</span>
              </p>
            </div>

            {/* Price */}
            <div className="relative">
              <div className="flex items-center space-x-4">
                <span className="text-5xl font-bold bg-black bg-clip-text text-transparent">
                  ${Number(product.price).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center bg-gray-900 text-gray-200 rounded-xl border border-gray-700">
                    <button 
                      onClick={decreaseQty}
                      className="px-4 py-3 hover:bg-gray-800 transition-colors rounded-l-xl font-bold text-xl"
                    >
                      −
                    </button>
                    <div className="px-6 py-3 border-x border-gray-700 font-bold">
                      {quantity}
                    </div>
                    <button 
                      onClick={increaseQty}
                      className="px-4 py-3 hover:bg-gray-800 transition-colors rounded-r-xl font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-green-400 font-semibold">✓ In Stock</div>
                  <div className="text-gray-400">Only {product.stock} left!</div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-gray-700 via-gray-500 to-slate-800 hover:from-gray-700 hover:via-gray-600 hover:to-slate-500 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl neon-glow"
                onClick={() => addToCart({ id:product.id, name: product.name, price:product.price, image: imageBaseUrl + product.image , quantity, stock: product.stock })} 
                  >
                  Add to Cart • ${(Number(product.price) * quantity).toLocaleString()}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Preview
