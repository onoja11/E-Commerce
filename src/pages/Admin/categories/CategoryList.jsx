import React, { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import LoadingSpinner from "../../../components/general/LoadingSpinner";

const CategoryList = () => {
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
        console.error(
          "Error fetching categories:",
          error.response?.data || error.message
        );
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
      console.error(
        "Error deleting category:",
        error.response?.data || error.message
      );
      alert("Failed to delete category. Please try again.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between my-14">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-600 rounded-full flex items-center justify-center shadow-lg">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Categories
            </h1>
            <p className="text-gray-600">Manage your categories below</p>
          </div>
        </div>
        <Link
          to="/admin/categories/add"
          className="px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition-colors"
        >
          + Add Category
        </Link>
      </div>

      {/* Categories Table */}
      <div className="relative overflow-x-auto shadow-md mt-10 sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
            All Categories
            <p className="mt-1 text-sm font-normal text-gray-500">
              Browse a list of categories and manage them
            </p>
          </caption>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Products Count
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Date Created
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {cat.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {cat.products?.length ?? 0}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {cat.created_at?.split("T")[0]}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {/* View Products */}
                    <Link
                      to={`/admin/categories/${cat.id}/products`}
                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      title="View Products"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    {/* Edit */}
                    <Link
                      to={`/admin/categories/edit/${cat.id}`}
                      className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Total categories: {categories.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
