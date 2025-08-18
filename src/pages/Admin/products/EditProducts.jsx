import React, { useState, useEffect } from 'react'
import { Package, Tag, DollarSign, FileText, Image, Plus } from 'lucide-react'
import axios from '../../../api/axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditProducts = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image: null,
    stock: ''
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [token]);

  // ✅ Fetch existing product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const product = res.data;

        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          category_id: product.category_id || '',
          stock: product.stock || '',
          image: null // don’t auto-fill file input
        });
      } catch (error) {
        console.error('Error fetching product:', error.response?.data || error.message);
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProduct();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Update product instead of creating new
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category_id', formData.category_id);
    data.append('stock', formData.stock);
    if (formData.image) data.append('image', formData.image); // only if new file is selected

    try {
      const response = await axios.post(`/api/products/${id}?_method=PUT`, data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Product updated:', response.data);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
    }
  };

  if (loadingProduct) {
    return <p className="text-center text-gray-500">Loading product details...</p>
  }

  return (
    <div className="min-h-screen my-8 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center my-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-black to-gray-600 rounded-full mb-4 shadow-lg">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent mb-2">
            Edit Product
          </h1>
          <p className="text-gray-600">Update your product details below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Package className="w-4 h-4 mr-2 text-black " />
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Tag className="w-4 h-4 mr-2 text-black " />
              Category
            </label>
            {loadingCategories ? (
              <p className="text-gray-500">Loading categories...</p>
            ) : (
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 mr-2 text-black " />
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Package className="w-4 h-4 mr-2 text-black " />
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Image className="w-4 h-4 mr-2 text-black " />
              Image (Upload new to replace)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 mr-2 text-black " />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-black to-gray-600 text-white py-3 px-6 rounded-xl font-semibold"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
