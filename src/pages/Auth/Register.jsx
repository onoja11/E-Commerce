import React, { useState } from 'react';
import axios from '../../api/axios'; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    confirm_password: "",
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // 1. Get CSRF cookie
      await axios.get("/sanctum/csrf-cookie");

      // 2. Send registration request
      const response = await axios.post("api/register", {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        password: formData.password,
        password_confirmation: formData.confirm_password, // Laravel needs this
      });

      setSuccess("Registration successful! Redirecting...");
      console.log(response.data);

      // Optional: redirect to login after 1s
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (err) {
      console.error(err.response?.data || err);
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen mt-5 bg-gray-100'>
      <div className='bg-white p-8 my-28 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>

        <form onSubmit={handleRegister}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='name'>Full Name</label>
            <input
              type='text'
              id='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='phone_number'>Phone Number</label>
            <input
              type='tel'
              id='phone_number'
              value={formData.phone_number}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              value={formData.address}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <div className='mb-6'>
            <label className='block text-sm font-medium mb-2' htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <div className='mb-6'>
            <label className='block text-sm font-medium mb-2' htmlFor='confirm_password'>Confirm Password</label>
            <input
              type='password'
              id='confirm_password'
              value={formData.confirm_password}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-gradient-to-r from-black via-gray-500 to-gray-800 text-white py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black'
          >
            Register
          </button>

          <div className="bg-black/50 p-[0.5px] my-8"></div>

          <p className='text-sm text-gray-600 text-center'>
            Already have an account? <a href='/login' className='text-black font-semibold hover:underline'>Login</a>    
          </p>  
        </form>
      </div>
    </div>
  );
};

export default Register;
