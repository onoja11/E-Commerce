import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import {Link} from 'react-router-dom';
import { Package, TrendingUp, MapPin, Mail, Calendar } from 'lucide-react';

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Calculate total spent
  const totalSpent = orders.reduce((acc, order) => acc + parseFloat(order.total_amount || 0), 0);

  const stats = [
    { number: orders.length, label: 'Total Orders', icon: Package },
    { number: `$${totalSpent.toFixed(2)}`, label: 'Total Spent', icon: TrendingUp },
  ];

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-15 relative overflow-hidden">
      <div className="container mx-auto px-6 py-10 relative z-10">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-white to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative group/avatar">
              <div className="w-32 h-32 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-black border-4 border-white/30 transition-all duration-300 group-hover/avatar:scale-105 group-hover/avatar:shadow-2xl group-hover/avatar:shadow-white/20">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>

            {/* User Info + Actions */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                  {user.name || "Unnamed User"}
                </h1>
                <div className="flex gap-3">
                  {['Edit Profile', 'View All Orders'].map((action, index) => (
                    <Link
                      to={action === 'Edit Profile' ? '/profile/edit' : '/orders'}
                      key={index}
                      // onClick={() => handleAction(action)}
                      className="bg-black text-white font-semibold py-2 px-4 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 active:scale-95"
                    >
                      {action}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Member since{" "}
                    {user.created_at ? new Date(user.created_at).getFullYear() : "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location || "No location set"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 cursor-pointer group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <IconComponent className="w-8 h-8 mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
