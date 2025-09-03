import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditOrder = () => {
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const {id} = useParams();
  const [orders, setOrders] = useState({})
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get('/sanctum/csrf-cookie'); 
      setLoading(true);     
      await axios.put(`/api/orders/ ${id}`, {status}, {
      headers: { Authorization: `Bearer ${token}` }
    });      
    setSuccess("Order added successfully!");
      navigate( '/admin/orders'); 
      setError("");
      setStatus("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add Order.");
      setSuccess("");
    }
  };

  useEffect(() => {
    if (token) {
      axios.get(`/api/orders/ ${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setOrders(response.data);
        setStatus(response.data.status);
        // setStatus(re)
      })
      .catch(() => {
        setOrders(null);
      });
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* <h2 className="text-2xl font-bold mb-4 text-center">Edit "{orders.name}" </h2> */}
         <div className = "flex gap-28 mb-4 align-items">
        <h2 className="text-xl font-bold  ">Edit "{orders.id}"</h2>
        <Link to="/admin/orders" className = "w-auto bg-black  text-white py-3 px-4   rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black">
        Orders 
        </Link>          
        </div>

        {success && <p className="text-green-600 mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

             <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-300 bg-white"
                required
              >
                <option value="">Select a category</option>
                  <option  value= "pending">
                    Pending
                  </option>
                  <option  value= "cancelled">
                    Cancelled
                  </option>
                  <option  value= "delivered">
                    Delivered
                  </option>
              </select>
              {error && <p className="text-red-600 mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-black via-gray-500 to-gray-800 text-white py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black"
          >
            {loading ? "Updating..." : "Edit Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
