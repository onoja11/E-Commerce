import React, { useState } from "react";
import axios from "../../../api/axios";
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get('/sanctum/csrf-cookie');      
      await axios.post('/api/categories', {name}, {
      headers: { Authorization: `Bearer ${token}` }
    });      
    setSuccess("Category added successfully!");
      navigate( '/admin/categories'); 
      setError("");
      setName("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add category.");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Category</h2>

        {success && <p className="text-green-600 mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
              {error && <p className="text-red-600 mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-black via-gray-500 to-gray-800 text-white py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
