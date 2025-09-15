import React, { useState } from 'react';
import axios from '../../api/axios'; 
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    try {
      // 1. Get CSRF cookie
      await axios.get("/sanctum/csrf-cookie");

      // 2. Send registration request
      const res = await axios.post("api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirm_password,
      });

      // ✅ Store both token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      showToast("Registration successful", "success");

      // Redirect to homepage after 1s
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      console.error("Registration error:", err.response?.data);

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setGeneralError("Registration failed. Please check your details.");
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen mt-5 bg-gray-100'>
      <div className='bg-white p-8 my-28 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>

        <form onSubmit={handleRegister}>
          {generalError && <p className="text-red-500 text-center mb-4">{generalError}</p>}

          {/* Name */}
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='name'>Full Name</label>
            <input 
              type='text'
              id='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
          </div>

          {/* Email */}
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='email'>Email</label>
            <input 
              type='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
          </div>

          {/* Password */}
          <div className='mb-6'>
            <label className='block text-sm font-medium mb-2' htmlFor='password'>Password</label>
            <input 
              type='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
          </div>

          {/* Confirm Password */}
          <div className='mb-6'>
            <label className='block text-sm font-medium mb-2' htmlFor='confirm_password'>Confirm Password</label>
            <input 
              type='password'
              id='confirm_password'
              value={formData.confirm_password}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
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
            Already have an account? <Link to={'/login'} className='text-black font-semibold hover:underline'>Login</Link>    
          </p>  
        </form>
      </div>
    </div>
  );
};

export default Register;
