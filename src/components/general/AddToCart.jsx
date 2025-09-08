import React, { useState } from 'react';
import { X, Trash2,ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import axios from '../../api/axios'; 
import {useToast} from '../../context/ToastContext';

const AddToCart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { showToast } = useToast();
  const imageBaseUrl = axios.defaults.baseURL + '/storage/'; 

  const navigate = useNavigate();
   const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Checkout handler
  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      showToast("Your cart is empty.", "error");
      return;
    }
   

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // if using Sanctum/JWT

      const response = await axios.post(
        "api/orders",
        {
          cart: cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log("Order placed:", response.data.message);

      setMessage(response.data.message);
      showToast("Order placed successfully!", "success");
      window.dispatchEvent(new Event("reviewStatusUpdated"));
      clearCart(); 
      onClose();   
    } catch (error) {
      console.error(error.response?.data || error.message);
      showToast(error.response?.data?.message || "Checkout failed. Please try again.", "error");
      setMessage(error.response?.data?.message || "Checkout failed.");
    } finally {
      setLoading(false);
    }
  };
  if(message === "Unauthenticated."){
    setMessage("Please login to proceed.");
    navigate("/login");
  }


  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transform transition-transform z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <h2 className="text-xl font-extrabold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <X className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="overflow-y-auto px-6 py-4 space-y-6 h-[calc(100%-160px)]">
        {cart.length === 0 ? (
          <div className="m-auto text-center mt-20 space-y-4">
            <ShoppingCart className="w-12 h-12 mx-auto text-gray-300" />
            <p className="text-center text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={imageBaseUrl+item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-gray-500 text-sm">{formatCurrency(Number(item.price).toLocaleString())}</p>
                <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Subtotal + Checkout Button */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-4">
        <div className="flex justify-between mb-3">
          <span className="text-gray-700 font-medium">Subtotal</span>
          <span className="font-semibold">
            
            {formatCurrency(
              cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
            )}
          </span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full bg-black text-white py-3 rounded-lg font-medium transition-all ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-900"
          }`}
        >
          {loading ? "Processing..." : "Proceed to Checkout"}
        </button>
        {message && <p className="mt-3 text-center text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default AddToCart;
