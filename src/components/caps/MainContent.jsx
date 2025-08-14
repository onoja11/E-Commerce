import React, { useEffect, useState } from 'react'
import Product from '../general/Product'
import Filter from './Filter'
import axios from '../../api/axios'
const MainContent = () => {
    const [products, setProducts] = useState([]);
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
  return (
<section id="collection" className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto ">
            {/* <!-- Section Header --> */}
            <div className="text-center mb-16 pt-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Our Collection
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Each cap is carefully selected to represent style, comfort, and quality
                </p>
            </div>

            {/* <!-- Category Filters --> */}
           <Filter/>

            {/* <!-- Caps Grid --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-5 gap-8">
               {products.map((product) => (
            <Product 
            border="border border-gray-200 shadow-lg"
              key={product.id}
              name={product.name}
              description={product.description}
              price={`$${product.price.toFixed(2)}`}
              pic={`http://kovecaps_api.test/${product.image}`}
              stock={product.stock}
             
            />
          ))}
                
               
            </div>
        </div>
    </section>  )
}

export default MainContent