import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
import LoadingSpinner from "../../../components/general/LoadingSpinner";

const EditCategory = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const token = localStorage.getItem("token");
  const {id} = useParams();
  const [categories, setCategories] = useState({})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get('/sanctum/csrf-cookie'); 
      setLoading(true);     
      await axios.put(`/api/categories/ ${id}`, {name}, {
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

  useEffect(() => {
    if (token) {
      axios.get(`/api/categories/ ${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setCategories(response.data);
        setLoadingCategory(false);
      })
      .catch(() => {
        setCategories(null);
      });
    }
  }, [token, id]);


  if (loadingCategory) {
    return <LoadingSpinner/>
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* <h2 className="text-2xl font-bold mb-4 text-center">Edit "{categories.name}" </h2> */}
         <div className = "flex gap-28 mb-4 align-items">
        <h2 className="text-xl font-bold  ">Edit "{categories.name}"</h2>
        <Link to="/admin/categories" className = "w-auto bg-black  text-white py-3 px-4   rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black">
        Categories
        </Link>          
        </div>

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
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
