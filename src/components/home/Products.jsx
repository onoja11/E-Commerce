import React from 'react'
import Product from './Product'
import pic1 from '../../assets/pexels-cottonbro-5119522.jpg'
import pic2 from '../../assets/pexels-dzeninalukac-1376049.jpg'
import pic3 from '../../assets/pexels-enginakyurt-1642228.jpg'

const Products = () => {
  return (
  <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl fade-in">
                    Trending Now
                </h2>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto fade-in">
                    Our most popular caps this season.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <Product name={'Urban Street Cap'} color={'Black'} pic={pic1} />
            <Product name={'Vintage Trucker'} color={'Blue/White'} pic={pic2} />
            <Product name={'Sport Performance'} color={'Red'} pic={pic3} />
            <Product name={'Premium Fitted'} color={'Gray'} pic={pic1} />
            </div>
        </div>
    </div>
      )
}

export default Products