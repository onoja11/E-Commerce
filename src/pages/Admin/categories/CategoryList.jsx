import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Link  } from "react-router-dom";
import Category from "../../../components/home/Category";
import pic1 from "../../../assets/pexels-cottonbro-5119522.jpg";
import { ChartBarStacked, Trash2,SquarePen, Plus } from "lucide-react";
import LoadingSpinner from "../../../components/general/LoadingSpinner";

const CategoriesList = () => {
//   const [categories, setCategories] = useState([]);


  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await axios.get('/api/categories', {
            headers: {  
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setCategories(res.data); 
          setLoading(false);
        } catch (error) {
          console.error('Error fetching categories:', error.response?.data || error.message);
        } 
      };
      fetchCategories();
    }, []);

const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

  try {
    await axios.delete(`/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    // Update state (remove category from list)
    setCategories(prev => prev.filter(cat => cat.id !== id));
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error.message);
    alert("Failed to delete category. Please try again.");
  }
};


  if (loading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-100 p-6">
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-600 rounded-full flex items-center justify-center shadow-lg">
              <ChartBarStacked className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                Categories
              </h1>
              <p className="text-gray-600">Manage your categories here.</p>
            </div>
          </div>

            <Link to={'/admin/categories/add'}  className="flex items-center bg-gradient-to-r from-black to-gray-600 text-white px-4 py-2 rounded-xl shadow hover:scale-[1.02] transition-all">
            <Plus className="w-4 h-4 " /> Add Category
            </Link>
        </div>
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found</p>
      ) : (
         <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {categories.map((cat) => (
    <div key={cat.id} className="relative group">
      {/* Category Card */}
      <Category
        category={cat.name}
        pic={pic1}
        description={cat.id}
      />

      {/* Hover Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Delete */}
        <button
            onClick={() => handleDelete(cat.id)}
            className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>


        {/* Edit */}
        <a
          href={`/admin/categories/edit/${cat.id}`}
          className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          title="Edit Category"
        >
          <SquarePen className="w-4 h-4" />
        </a>
      </div>
    </div>


          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
