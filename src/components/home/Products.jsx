import React from 'react'
import Product from '../general/Product'
import pic1 from '../../assets/pexels-cottonbro-5119522.jpg'
import pic2 from '../../assets/pexels-dzeninalukac-1376049.jpg'
import pic3 from '../../assets/pexels-enginakyurt-1642228.jpg'

const Products = () => {
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
                <Product name={'Urban Street Cap'} description={'Black'} pic={pic1} price={`$10`}/>
            <Product name={'Vintage Trucker'} description={'Blue/White'} pic={pic2} price={`$40`} />
            <Product name={'Sport Performance'} description={'Red'} pic={pic3} price={`$99.9`}/>
            <Product name={'Premium Fitted'} description={'Gray'} pic={pic1} price={`$230`}/>
            </div>
            
            </div>
        </div>
      )
}

export default Products