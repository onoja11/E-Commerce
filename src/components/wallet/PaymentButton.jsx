import React from 'react';
import axios from '../../api/axios';
import { Send } from 'lucide-react';

const PaymentButton = ({ amount }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handlePayment = async () => {
    try {
      const response = await axios.post('/api/pay', {
        amount,
        email: user.email,
        user_id: user.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { authorization_url } = response.data;
      window.location.href = authorization_url; // redirect to Paystack checkout
    } catch (error) {
      console.error("Payment initiation failed:", error.response?.data || error.message);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      className="bg-black text-white px-4 py-2 w-full rounded hover:bg-black/70">
        <Send className="w-4 h-4 inline-block mr-2" />
      Deposit
    </button>
  );
};

export default PaymentButton;
