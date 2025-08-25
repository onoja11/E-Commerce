import React, { useEffect, useState } from "react";
import { Package, Tag, DollarSign, Edit3, Trash2, Plus } from "lucide-react";
import Product from "../../../components/general/Product";
import axios from "../../../api/axios";
import { Link, useNavigate } from 'react-router-dom'; 

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Simulated fetch (replace with your API call)
   useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get('/api/products');
          setProducts(res.data); // Make sure API returns array of { id, name }
        } catch (error) {
          console.error('Error fetching categories:', error.response?.data || error.message);
        } 
      };
      fetchProducts();
    }, []);
    console.log(products);

  const handleDelete =async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
          await axios.delete(`/api/products/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
    });

    setProducts(prev => prev.filter(p => p.id !== id));
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error.message);
    alert("Failed to delete product. Please try again.");
  }
    
  };

  const handleEdit = (id) => {
    // alert(`Edit product with ID: ${id}`);
    navigate(`/admin/product/${id}`)
    // Redirect or open modal for editing
  };

  return (
    <div className="min-h-screen my-8 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-600 rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                All Products
              </h1>
              <p className="text-gray-600">Manage your product list below</p>
            </div>
          </div>

            <Link to="/admin/create/product"  className="flex items-center bg-gradient-to-r from-black to-gray-600 text-white px-4 py-2 rounded-xl shadow hover:scale-[1.02] transition-all">
            <Plus className="w-4 h-4 " /> Add Product
            </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Product textColor="text-gray-800"
            border="border border-gray-200 shadow-lg"
              key={product.id}
              id={product.id}   
              category={product.category.name}
              name={product.name}
              preview = {'hidden'}
              addToCartBtn = {'hidden'}
              description={product.description.length > 30 
                          ? product.description.substring(0, 30) + "..." 
                          : product.description}
              price={`$${product.price.toFixed(2)}`}
              pic={`http://kovecaps_api.test/${product.image}`}
              stock={product.stock}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewProducts;
