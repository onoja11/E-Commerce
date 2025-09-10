import React, { useEffect, useState } from 'react'
import { Layers } from 'lucide-react'
import axios from '../../api/axios'

const Filter = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex overflow-auto sticky top-20 z-10 md:justify-center md:gap-4 gap-2 mb-16">
      {loading ? (
        // Skeleton loader for filter buttons
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-500/40 rounded-full animate-pulse"
            ></div>
          ))}
        </>
      ) : (
        <>
          <button 
            onClick={() => setSelectedCategory("all")}
            className="category-btn cursor-pointer px-6 py-3 bg-white/30 rounded-full text-white text-sm font-medium hover:bg-white/60 hover:bg-opacity-20 hover:text-black focus:outline-none focus:ring-1 focus:ring-gray-200"
          >
            <Layers />
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className="category-btn cursor-pointer px-6 py-3 bg-white/30 rounded-full text-white text-sm font-medium hover:bg-white/60 hover:bg-opacity-20 hover:text-black focus:outline-none focus:ring-1 focus:ring-gray-200"
            >
              {category.name}
            </button>
          ))}
        </>
      )}
    </div>
  )
}

export default Filter
