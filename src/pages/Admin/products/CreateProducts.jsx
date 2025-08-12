import React, { useState } from 'react'
import { Package, Tag, DollarSign, FileText, Image, Plus } from 'lucide-react'

const CreateProducts = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: ''
  })

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Books',
    'Sports',
    'Beauty',
    'Automotive',
    'Toys',
    'Food & Beverage',
    'Health'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Product data:', formData)
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      stock: ''
    })
    alert('Product created successfully!')
  }

  return (
    <div className="min-h-screen my-8  py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center my-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-black  to-gray-600 rounded-full mb-4 shadow-lg">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-black  to-gray-600 bg-clip-text text-transparent mb-2">
            Create New Product
          </h1>
          <p className="text-gray-600">Add your product details below</p>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black  focus:border-transparent transition-all duration-200 hover:border-gray-300"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Tag className="w-4 h-4 mr-2 text-black " />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black  focus:border-transparent transition-all duration-200 hover:border-gray-300 bg-white"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price and Stock Row */}
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black  focus:border-transparent transition-all duration-200 hover:border-gray-300"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black  focus:border-transparent transition-all duration-200 hover:border-gray-300"
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Image className="w-4 h-4 mr-2 text-black " />
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black  focus:border-transparent transition-all duration-200 hover:border-gray-300"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black  focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-black  to-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-black  hover:to-gray-700 focus:ring-2 focus:ring-black  focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Create Product
            </button>
          </div>
        </form>

        {/* Preview Card */}
        {(formData.name || formData.category || formData.price) && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" onError={(e) => e.target.style.display = 'none'} />
                ) : (
                  <Package className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{formData.name || 'Product Name'}</h4>
                <p className="text-sm text-black  mb-1">{formData.category || 'Category'}</p>
                <p className="text-lg font-bold text-green-600">${formData.price || '0.00'}</p>
                {formData.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{formData.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateProducts