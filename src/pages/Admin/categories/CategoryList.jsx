import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

const CategoriesList = () => {
//   const [categories, setCategories] = useState([]);

  const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest gadgets and electronic devices.",
    image: "https://via.placeholder.com/300x200?text=Electronics"
  },
  {
    id: 2,
    name: "Fashion",
    description: "Trendy clothing and accessories.",
    image: "https://via.placeholder.com/300x200?text=Fashion"
  },
  {
    id: 3,
    name: "Home & Kitchen",
    description: "Furniture, decor, and kitchen essentials.",
    image: "https://via.placeholder.com/300x200?text=Home+%26+Kitchen"
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    description: "Gear and apparel for your favorite sports.",
    image: "https://via.placeholder.com/300x200?text=Sports+%26+Outdoors"
  },
  {
    id: 5,
    name: "Books",
    description: "Fiction, non-fiction, and educational books.",
    image: "https://via.placeholder.com/300x200?text=Books"
  }
];
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("/categories");
//         setCategories(res.data);
//       } catch (error) {
//         console.error("Error fetching categories", error);
//       }
//     };
//     fetchCategories();
//   }, []);
  

  return (
    <div className="min-h-screen mt-16 bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Categories
      </h2>
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500">
                Category ID: {cat.id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
