import React, { useEffect, useState } from 'react'
import Product from '../general/Product'
import pic1 from '../../assets/pexels-cottonbro-5119522.jpg'
import pic2 from '../../assets/pexels-dzeninalukac-1376049.jpg'
import pic3 from '../../assets/pexels-enginakyurt-1642228.jpg'
import axios from '../../api/axios'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react';


const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/products');
                setProducts(res.data); // Make sure API returns array of { id, name }
            } catch (error) {
                console.error('Error fetching products:', error.response?.data || error.message);
            }
        }
        fetchProducts();
    })
  return (
  <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black  py-12 sm:py-16">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-200 sm:text-4xl fade-in">
                    Trending Now
                </h2>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto fade-in">
                    Our most popular caps this season.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {products.slice(0,4).map(product => (
                    <Product
                        key={product.id}
                        name={product.name}
                        id={product.id}
                        route={product.id}
                        category={product.category.name}
                        description= {product.description.length > 30 
                                        ? product.description.substring(0, 30) + "..." 
                                        : product.description}
                        price={`${product.price.toFixed(2)}`}
                        actionButtons= {'hidden'}
                        pic={`http://kovecaps_api.test/${product.image}`}
                        stock={product.stock}
                        border="border border-gray-200 shadow-lg"
                    />
                ))}
                
            </div>
            
           <div className="flex justify-center mt-8">
  <Link 
    to="/caps" 
    className="bg-gradient-to-r from-gray-700 flex gap-2 to-gray-600 animate-bounce text-white px-6 py-3 rounded-lg shadow hover:scale-[1.02] transition-all"
  >
    <Plus />
    View More
  </Link>
</div>

            </div>
        </div>
      )
}

export default Products