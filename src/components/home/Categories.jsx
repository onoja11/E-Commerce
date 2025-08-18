import React, { useState, useEffect } from 'react'
import pic1 from '../../assets/pexels-cottonbro-5119522.jpg'
import pic2 from '../../assets/pexels-dzeninalukac-1376049.jpg'
import pic3 from '../../assets/pexels-enginakyurt-1642228.jpg'
import Category from './Category'
import axios from '../../api/axios'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/categories');
                setCategories(res.data); // Make sure API returns array of { id, name }
            } catch (error) {
                console.error('Error fetching categories:', error.response?.data || error.message
                );
            }
        }
        fetchCategories();
    }, []);

  return (
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl fade-in">
                    Shop By Category
                </h2>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto fade-in">
                    Find the perfect cap for any occasion.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              
                {categories.slice(0, 3).map(category => (
                    <Category key={category.id}
                        category={category.name}
                        pic={category.products[0]?.image 
                        ? `http://kovecaps_api.test/${category.products[0].image}` 
                        : pic1}                        
                    />  
                ))}
            </div>
        </div>
    </div>
  )
}

export default Categories