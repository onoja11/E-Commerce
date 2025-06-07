import React from 'react'

const Register = () => {
  return (
   <div className='flex items-center justify-center min-h-screen mt-5 bg-gray-100'>
      <div className='bg-white p-8 my-28 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='name'>Full Name</label>
            <input
              type='text'
              id='name'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='phone_number'>Phone Number</label>
            <input
              type='telephone'
              id='phone_number'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-medium mb-2' htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-medium mb-2' htmlFor='confirm_password'>Confirm Password</label>
            <input
              type='password'
              id='confirm_password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-black via-gray-500 to-gray-800   text-white py-3 rounded-lg hover:bg-gradient-to-l  transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black'
          >
            Register
          </button>
          <div className="bg-black/50 p-[0.5px] my-8"></div>
          {/* google Register */}
            <button
                type='button'
                className='w-full bg-white text-black py-3 my-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-center space-x-2'
            >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Register with Google</span>
            </button>
            <p className='text-sm text-gray-600 text-center'>
                Don't have an account? <a href='/login' className='text-black font-semibold hover:underline'>Login</a>    
            </p>
        </form>
      </div>

    </div>
  )
}

export default Register