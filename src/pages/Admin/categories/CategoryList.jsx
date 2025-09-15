import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import { ChartBarStacked, Package, Plus, Trash2, SquarePen } from "lucide-react";
import LoadingSpinner from "../../../components/general/LoadingSpinner";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error.response?.data || error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error.response?.data || error.message);
      alert("Failed to delete category. Please try again.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Header */}
      <div className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              CATEGORIES
            </h1>
            <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Organize and explore your product categories.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No categories found.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                {/* Category Header */}
                <div className="relative bg-gradient-to-r from-black to-gray-900 text-white p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold tracking-wide">{cat.name}</h2>
                      <p className="text-gray-300 mt-1">Category ID: {cat.id}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-4 lg:mt-0">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow"
                      >
                        <Trash2 className="w-4 h-4 inline-block mr-1" /> Delete
                      </button>
                      <Link
                        to={`/admin/categories/edit/${cat.id}`}
                        className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg shadow"
                      >
                        <SquarePen className="w-4 h-4 inline-block mr-1" /> Edit
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Category Details */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Products
                      <span className="text-gray-500">({cat.products?.length || 0})</span>
                    </h3>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">
                      {cat.products?.length || 0}
                    </div>
                  </div>

                  {/* View Products Button */}
                  <div className="mt-4">
                    <Link
                      to={`/admin/categories/${cat.id}/products`}
                      className="inline-block px-6 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-lg transition-colors"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Category Floating Button */}
      <Link
        to={"/admin/categories/add"}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-black to-gray-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default CategoriesList;
