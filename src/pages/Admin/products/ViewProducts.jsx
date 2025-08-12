import React, { useEffect, useState } from "react";
import { Package, Tag, DollarSign, Edit3, Trash2, Plus } from "lucide-react";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  // Simulated fetch (replace with your API call)
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 99.99,
        stock: 15,
        imageUrl: "https://via.placeholder.com/150",
        description: "High-quality wireless headphones with noise cancellation."
      },
      {
        id: 2,
        name: "Yoga Mat",
        category: "Sports",
        price: 29.99,
        stock: 50,
        imageUrl: "https://via.placeholder.com/150",
        description: "Comfortable and durable yoga mat for all exercises."
      }
    ]);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
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

          <button className="flex items-center bg-gradient-to-r from-black to-gray-600 text-white px-4 py-2 rounded-xl shadow hover:scale-[1.02] transition-all">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-12 h-12 text-gray-400" />
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-bold text-lg text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mb-1 flex items-center">
                  <Tag className="w-4 h-4 mr-1" /> {product.category}
                </p>
                <p className="text-lg font-bold text-green-600 flex items-center mb-2">
                  <DollarSign className="w-4 h-4 mr-1" /> {product.price}
                </p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Stock: {product.stock}
                </p>

                {/* Action buttons */}
                <div className="mt-auto flex space-x-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Edit3 className="w-4 h-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
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
