import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import {Link} from 'react-router-dom';
import { Package, TrendingUp, MapPin, Mail, Calendar, User, Settings, ShoppingBag } from 'lucide-react';
import LoadingSpinner from '../../components/general/LoadingSpinner';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          // Fetch user info
          const userRes = await axios.get('/api/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(userRes.data);

          // Fetch orders
          const ordersRes = await axios.get('/api/orders', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setOrders(ordersRes.data);
        }
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
        setUser(null);
        setOrders([]);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Calculate total spent
  const totalSpent = orders.reduce((acc, order) => acc + parseFloat(order.total_amount || 0), 0);

  const stats = [
    { number: orders.length, label: 'Total Orders', icon: Package, color: 'from-black to-gray-600' },
    { number: `$${Number(totalSpent).toLocaleString()}`, label: 'Total Spent', icon: TrendingUp, color: 'from-black to-gray-600' },
  ];

  

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl max-w-md w-full">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-800 mb-2">Access Required</p>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16 sm:pt-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10 max-w-7xl">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-white to-white/95 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 relative overflow-hidden group shadow-xl">
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 lg:gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative group/avatar flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-bold text-black border-4 border-white/30 transition-all duration-300 group-hover/avatar:scale-105 group-hover/avatar:shadow-2xl group-hover/avatar:shadow-white/20 shadow-lg">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            {/* User Info + Actions */}
            <div className="flex-1 w-full min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 sm:mb-6">
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    {user.name || "Unnamed User"}
                  </h1>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  {[
                    { label: 'Edit Profile', icon: Settings, link: `/profile/edit/${user.id}` },
                    { label: 'View Orders', icon: ShoppingBag, link: '/orders' }
                  ].map((action, index) => (
                    <Link
                      to={action.link}
                      key={index}
                      className="bg-black text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                    >
                      <action.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{action.label}</span>
                      <span className="sm:hidden">{action.label.split(' ')[0]}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-white/20 backdrop-blur-sm">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-white/20 backdrop-blur-sm">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Member Since</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.created_at ? new Date(user.created_at).getFullYear() : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 cursor-pointer group relative overflow-hidden shadow-lg"
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">{stat.number}</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Activity Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {orders.slice(0, 3).map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-green-600">
                    ${parseFloat(order.total_amount || 0).toFixed(2)}
                  </span>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No recent orders</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;