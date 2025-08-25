import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const AddToCart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transform transition-transform z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4">
        <h2 className="text-xl font-extrabold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <X className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="overflow-y-auto px-6 py-4 space-y-6 h-[calc(100%-160px)]">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-gray-500 text-sm">${item.price}</p>
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

      <div className="absolute bottom-0 left-0 right-0 px-6 py-4">
        <div className="flex justify-between mb-3">
          <span className="text-gray-700 font-medium">Subtotal</span>
          <span className="font-semibold">
            ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </span>
        </div>
        <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-all">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
