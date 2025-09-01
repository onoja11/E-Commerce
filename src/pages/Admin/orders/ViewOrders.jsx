import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, ReceiptText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';

const ViewOrders = () => {
 const [orders, setOrders] = useState([])
    useEffect(() => {
        // Simulated fetch (replace with your API call)
        const fetchorders = async () => {
          try { 
            const res = await axios.get('/api/admin/orders',
                {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
    }
            );
            setOrders(res.data); // Make sure API returns array of { id, name }
            } catch (error) {
            console.error('Error fetching categories:', error.response?.data || error.message);
          }
        };
        fetchorders();
        }, []);

  const getStatusBadge = (status) => {
    const statusStyles = {
      "delivered": "bg-green-100 text-green-800",
      "pending": "bg-yellow-100 text-yellow-800", 
      "cancelled": "bg-red-100 text-red-800"
    };

    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between my-14">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-600 rounded-full flex items-center justify-center shadow-lg">
              <ReceiptText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                All Orders
              </h1>
              <p className="text-gray-600">Manage your order list below</p>
            </div>
          </div>
        </div>
        {/* heading */}
      <div className="relative overflow-x-auto shadow-md mt-10 sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
            Our orders
            <p className="mt-1 text-sm font-normal text-gray-500">
              Browse a list of orders 
            </p>
          </caption>
          
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                User Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Number of Items
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Order_id
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Date Ordered
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.user.name}
                </th>
                <td className="px-6 py-4 text-gray-700">
                  {order.items.length}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {order.total_amount}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {order.created_at.split('T')[0]}
                </td>
               
                <td className="px-6 py-4">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link  to={`/admin/orders/view/${order.id}`} className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors" title="View">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link to={`/admin/orders/edit/${order.  id}`} className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors" title="Edit">
                      <Edit className="h-4 w-4" />
                    </Link >
                    {/* <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Simple Summary */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Total orders: {orders.length}</span>
            {/* <span>In Stock: {orders.filter(p => p.status === 'In Stock').length}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;