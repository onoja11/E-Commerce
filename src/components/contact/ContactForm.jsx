import React, { useState } from "react";
import axios from "../../api/axios"; // adjust path to your axios instance

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess("");

    try {
      await axios.post("/api/contact", formData);
      setSuccess("Your message has been sent successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (err) {
      setErrors(err.response?.data?.errors || "An error occurred. Please try again.");
      console.error(err.response?.data.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
      
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input 
              type="text" 
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" 
              placeholder="John"
              required
            />
                {errors && <p className="text-red-600 mb-4">{errors.firstname }</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input 
              type="text" 
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" 
              placeholder="Doe"
              required
            />
            {errors && <p className="text-red-600 mb-4">{errors.lastname }</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" 
            placeholder="john@example.com"
            required
          />
            {errors && <p className="text-red-600 mb-4">{errors.email }</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" 
            placeholder="+1 (555) 123-4567"
            required
          />
            {errors && <p className="text-red-600 mb-4">{errors.phone }</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
          >
            <option>General Inquiry</option>
            <option>Custom Order</option>
            <option>Wholesale Partnership</option>
            <option>Product Support</option>
            <option>Collaboration</option>
          </select>
            {errors && <p className="text-red-600 mb-4">{errors.subject }</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea 
            rows="6" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none" 
            placeholder="Tell us about your project or how we can help you..."
            required
          />
            {errors && <p className="text-red-600 mb-4">{errors.message }</p>}
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
