import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

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
    setSuccess("");
    try {
      // 1. Get CSRF cookie
       await axios.get("/sanctum/csrf-cookie");
      // 2. Send update request
      const res = await axios.put("api/update/profile", {
        name: formData.name,
        email: formData.email,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("Profile updated successfully:", res.data);
      setSuccess("Profile updated successfully! Redirecting...");
      // Redirect to profile after 1s
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      setGeneralError("Failed to update profile. Please try again.");
    } 
  };



useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUser(res.data);
      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
      });
      console.log(res.data);
    } catch (error) {
      setUser(null);
      console.error('Error fetching user data:', error.response?.data || error.message);
    }
  };

  fetchUser();
}, []);

  return (
 <div className='flex items-center justify-center min-h-screen mt-5 bg-gray-100'>
      <div className='bg-white p-8 my-28 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Edit Profile</h2>

        <form
         onSubmit={handleRegister}
         >
          {generalError && <p className="text-red-500 text-center mb-4">{generalError}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

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

         

          <button
            type='submit'
            className='w-full bg-gradient-to-r mt-3 from-black via-gray-500 to-gray-800 text-white py-3 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black'
          >
            Edit
          </button>


        </form>
      </div>
    </div>
      )
}

export default EditProfile