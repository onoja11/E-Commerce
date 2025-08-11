import React, { useState } from 'react';
import axios from '../../api/axios'; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Get CSRF cookie
      await axios.get("/sanctum/csrf-cookie");

      // 2. Login request
      const response = await axios.post("api/login", {
        email,
        password
      });
      console.log(response.data);

      // Optionally redirect to dashboard
      window.location.href = "/";
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Invalid credentials or login failed");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen mt-5 bg-gray-100'>
      <div className='bg-white p-8 my-28 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <div className='mb-6'>
            <label className='block text-sm font-medium mb-2' htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-gradient-to-r from-black via-gray-500 to-gray-800 text-white py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black'
          >
            Login
          </button>

          <div className="bg-black/50 p-[0.5px] my-8"></div>

          <p className='text-sm text-gray-600 text-center'>
            Don't have an account? <a href='/register' className='text-black font-semibold hover:underline'>Register</a>    
          </p>
          <p className='text-sm text-gray-600 text-center mt-2'>
            <a href='/forgot-password' className='text-black font-semibold hover:underline'>Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
