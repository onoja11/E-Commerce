import React, { useEffect, useState } from "react";
import axios from '../../api/axios';
import { SquarePen, Trash2, Package, Calendar, DollarSign, ShoppingBag } from "lucide-react";
import LoadingSpinner from "../../components/general/LoadingSpinner";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setLoadingAction(true);
      await axios.put(
        `/api/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (err) {
      console.error("Error cancelling order:", err);
    } finally {
      setLoadingAction(false);
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return "✓";
      case "cancelled":
        return "✕";
      case "pending":
        return "⟳";
      default:
        return "○";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-600 text-white";
      case "cancelled":
        return "bg-red-800 text-white";
      case "pending":
        return "bg-white text-black border-2 border-black";
      default:
        return "bg-gray-100 text-black";
    }
  };

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Header */}
      <div className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
              MY ORDERS
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed px-4">
              Track your journey through premium purchases and exceptional experiences
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {orders.length === 0 ? (
          <div className="text-center py-16 sm:py-20 lg:py-24 px-4">
            <div className="relative inline-block mb-6 sm:mb-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-black rounded-full flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white transform scale-0 rounded-full transition-transform duration-500 group-hover:scale-100"></div>
                <ShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white relative z-10 transition-colors duration-500 group-hover:text-black" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">No Orders Yet</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Your journey begins with your first purchase. Start exploring our curated collection.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 overflow-hidden ${
                  selectedOrder === order.id ? 'ring-2 sm:ring-4 ring-black ring-opacity-20' : ''
                }`}
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              >
                {/* Order Header */}
                <div className="relative bg-gradient-to-r from-black to-gray-900 text-white p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                      {/* Order ID and Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide truncate">
                          ORDER #{order.id}
                        </h2>
                        <div className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${getStatusColor(order.status)} w-fit`}>
                          <span className="mr-1 sm:mr-2">{getStatusIcon(order.status)}</span>
                          <span className="whitespace-nowrap">{order.status.toUpperCase()}</span>
                        </div>
                      </div>
                      
                      {/* Date */}
                      <div className="flex items-center gap-2 mb-4 sm:mb-0">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg font-light">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>

                      {/* Cancel Button */}
                      {order.status !== "delivered" && order.status !== "cancelled" && (
                        <div className="mt-4 sm:mt-6">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelOrder(order.id);
                            }}
                            disabled={loadingAction}
                            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg sm:rounded-xl transition-colors disabled:opacity-50 text-sm sm:text-base"
                          >
                            {loadingAction ? "Cancelling..." : "Cancel Order"}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Total Amount */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start text-right border-t border-gray-700 pt-4 sm:border-t-0 sm:pt-0 lg:ml-8">
                      <p className="text-gray-400 text-xs sm:text-sm font-light uppercase tracking-widest mb-0 sm:mb-1 flex items-center sm:block">
                        <DollarSign className="w-4 h-4 mr-1 sm:hidden" />
                        Total
                      </p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black">
                        ₦{parseFloat(order.total_amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Items Header */}
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black uppercase tracking-wide flex items-center gap-2">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="hidden sm:inline">Items</span>
                      <span className="sm:hidden">Items</span>
                      <span className="text-gray-500">({order.items.length})</span>
                    </h3>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      {order.items.length}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="grid gap-4 sm:gap-6">
                    {order.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="group/item relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-black transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-gray-50"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            {/* Category */}
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full flex-shrink-0"></div>
                              <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest">
                                {item.product.category}
                              </span>
                            </div>
                            
                            {/* Product Name */}
                            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-black mb-3 group-hover/item:text-gray-700 transition-colors line-clamp-2">
                              {item.product.name}
                            </h4>
                            
                            {/* Quantity and Price */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                              <div className="bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold w-fit">
                                QTY {item.quantity}
                              </div>
                              <div className="text-gray-600 font-mono text-sm sm:text-base lg:text-lg">
                                ₦{parseFloat(item.price).toFixed(2)} each
                              </div>
                            </div>
                          </div>

                          {/* Subtotal */}
                          <div className="text-left sm:text-right sm:ml-8 pt-3 sm:pt-0 border-t border-gray-200 sm:border-t-0">
                            <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide mb-1">Subtotal</p>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-black text-black">
                              ₦{(item.quantity * parseFloat(item.price)).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Item separator */}
                        {index < order.items.length - 1 && (
                          <div className="absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
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