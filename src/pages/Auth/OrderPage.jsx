import React, { useEffect, useState } from "react";
import axios from '../../api/axios';
import { SquarePen, Trash2 } from "lucide-react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

    useEffect(() => {
    if (token) {
      axios
        .get("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  const [loading, setLoading] = useState(false);

const handleCancelOrder = async (orderId) => {
  if (!window.confirm("Are you sure you want to cancel this order?")) return;

  try {
    setLoading(true);
    await axios.put(
      `/api/orders/${orderId}/cancel`, // adjust API route if needed
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update UI: change status to cancelled
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  } catch (err) {
    console.error("Error cancelling order:", err);
  } finally {
    setLoading(false);
  }
};


  const [selectedOrder, setSelectedOrder] = useState(null);

  

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return "✓";
      case "cancelled":
        return "x";
      case "pending":
        return "⟳";
      default:
        return "○";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-black text-white";
      case "cancelled":
        return "bg-red-800 text-white";
      case "pending":
        return "bg-white text-black border-2 border-black";
      default:
        return "bg-gray-100 text-black";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
     

      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
        <div className="relative max-w-6xl mx-auto px-8 py-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
              MY ORDERS
            </h1>
            <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Track your journey through premium purchases and exceptional experiences
            </p>
          </div>
        </div>

        
        
       
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-8 py-16">
        {orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white transform scale-0 rounded-full transition-transform duration-500 group-hover:scale-100"></div>
                <svg className="w-16 h-16 text-white relative z-10 transition-colors duration-500 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">No Orders Yet</h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
              Your journey begins with your first purchase. Start exploring our curated collection.
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order, orderIndex) => (
              <div
                key={order.id}
                className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 overflow-hidden ${
                  selectedOrder === order.id ? 'ring-4 ring-black ring-opacity-20' : ''
                }`}
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              >
                {/* Order Header */}
                <div className="relative bg-gradient-to-r from-black to-gray-900 text-white p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h2 className="text-3xl font-black tracking-wide">
                          {order.id}
                        </h2>
                        <div className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${getStatusColor(order.status)}`}>
                          <span className="mr-2">{getStatusIcon(order.status)}</span>
                          {order.status.toUpperCase()}
                        </div>
                        
                      </div>
                      <p className="text-gray-300 text-lg font-light">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>

                         {order.status !== "delivered" && order.status !== "cancelled" && (
                          <div className="mt-6">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancelOrder(order.id);
                              }}
                              disabled={loading}
                              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                            >
                              {loading ? "Cancelling..." : "Cancel Order"}
                            </button>
                          </div>
                        )}

                    </div>

                
                    
                    <div className="mt-6 lg:mt-0 text-right">
                      <p className="text-gray-400 text-sm font-light uppercase tracking-widest mb-1">Total</p>
                      <p className="text-5xl font-black">${order.total_amount}</p>
                    </div>
                  </div>

                 
                </div>

                {/* Order Items */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                      Items ({order.items.length})
                    </h3>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">
                      {order.items.length}
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {order.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="group/item relative p-6 rounded-2xl border-2 border-gray-100 hover:border-black transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-3 h-3 bg-black rounded-full"></div>
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                {item.product.category}
                              </span>
                            </div>
                            
                            <h4 className="text-xl font-bold text-black mb-3 group-hover/item:text-gray-700 transition-colors">
                              {item.product.name}
                            </h4>
                            
                            <div className="flex items-center gap-6">
                              <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
                                QTY {item.quantity}
                              </div>
                              <div className="text-gray-600 font-mono text-lg">
                                ${item.price} each
                              </div>
                            </div>
                          </div>

                          <div className="text-right ml-8">
                            <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">Subtotal</p>
                            <p className="text-3xl font-black text-black">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Item separator */}
                        {index < order.items.length - 1 && (
                          <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

               
              </div>
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default OrdersPage;