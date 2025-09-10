import React, { useEffect, useState } from "react";
import { Package, Plus } from "lucide-react";
import Product from "../../../components/general/Product";
import axios from "../../../api/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/general/LoadingSpinner";
import ProductSkeleton from "../../../components/general/ProductSkeleton";

const OrderDetails = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.items) {
          const productsInOrder = res.data.items.map((item) => ({
            ...item.product,      
            quantity: item.quantity,
          }));
          setProducts(productsInOrder);
          setLoading(false);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(
          "Error fetching order details:",
          error.response?.data || error.message
        );
      }
    };

    fetchOrderDetails();
  }, [id, token]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/product/${productId}`);
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
                Order '{id}' Details
              </h1>
              <p className="text-gray-600">Manage products in this order</p>
            </div>
          </div>
        </div>
        {loading? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-5 gap-8">
            {Array.from({ length: 8 }).map(() => (
              <ProductSkeleton/>
            ))}
          </div>
        ): (
          <>
           {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Product
  textColor="text-gray-800"
  border="border border-gray-200 shadow-lg"
  key={product.id}
  id={product.id}
  category={product.category?.name}
  name={product.name}
  preview="hidden"
  addToCartBtn="hidden"
  actionButtons="hidden"
  description={
    product.description?.length > 30
      ? product.description.substring(0, 30) + "..."
      : product.description
  }
  price={product.price}
  pic={
    product.image
  }
  quantity={product.quantity}
  onDelete={handleDelete}
  onEdit={handleEdit}
/>

          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No products available in this order.
          </p>
        )}
          </>
        )
      }

       
      </div>
    </div>
  );
};

export default OrderDetails;
