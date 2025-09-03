import React, { useEffect, useState } from "react";
import { Package, Search, Grid3X3, Tag, ShoppingBag } from "lucide-react";
import Product from "../components/general/Product";
import axios from "../api/axios";
import { Link, useLocation } from "react-router-dom";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get query param from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(`/api/search?query=${query}`);
        setProducts(res.data.products || []);
        setCategories(res.data.categories || []);
      } catch (error) {
        console.error("Error searching:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4 animate-pulse">
            <Search className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-medium text-gray-700">
            Searching for "<span className="font-bold text-black">{query}</span>"...
          </p>
        </div>
      </div>
    );
  }

  const totalResults = products.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex mt-[60px] items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  Search Results
                </h1>
                <p className="text-gray-600 mt-1">
                  Showing {totalResults} results for "
                  <span className="font-semibold text-black">{query}</span>"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Products Section */}
        <div className="mb-12">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="transform hover:scale-105 transition-all duration-200">
                   <Product 
                                border="border border-gray-200 shadow-lg hover:shadow-xl"
                                key={product.id}
                                name={product.name}
                                id={product.id}
                                route={product.id}
                                actionButtons= {'hidden'}
                                category={product.category.name}
                                description={product.description.length > 30 
                                  ? product.description.substring(0, 30) + "..." 
                                  : product.description}
                                price={`${Number(product.price).toLocaleString()}`}
                                pic={product.image}
                                stock={product.stock}
                                textColor="text-gray-800"
                              />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center ">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No results found for "{query}"
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any products or categories matching your search. 
              Try different keywords or browse our catalog.
            </p>
            <Link to={'/caps'} className="bg-gradient-to-r from-black to-gray-600 text-white px-6 py-3 rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 font-medium">
              Browse All Products
            </Link>
          </div>
          )}
        </div>

      
      </div>
    </div>
  );
};

export default SearchResults;