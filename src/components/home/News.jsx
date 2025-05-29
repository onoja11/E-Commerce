import React from 'react'

const News = () => {
  return (
  <div className="bg-black py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center fade-in">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Stay in Touch
                </h2>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                    Subscribe to our newsletter for exclusive deals and updates.
                </p>
            </div>
            <div className="mt-8 max-w-md mx-auto fade-in">
                <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
                    <div className="sm:col-span-2">
                        <label for="email" className="sr-only text-gray-300">Email</label>
                        <input type="email" name="email" id="email" autocomplete="email" placeholder="Enter your email" className="py-3 px-4 bg-white block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"/>
                    </div>
                    <div>
                        <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div> 
     )
}

export default News