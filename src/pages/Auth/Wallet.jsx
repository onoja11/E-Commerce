import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, TrendingDown, Plus, Send, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import axios from '../../api/axios';

const Wallet = () => {
  const [transactions, setTransactions] = useState([]);



  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchWallet = async () => {
        try {
            const res = await axios.get('/api/wallets/', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setWallet(res.data.wallet);
            setTransactions(res.data.transactions || []);
            console.log(res.data);
        } catch (error) {
            console.error('Error fetching wallet:', error.response?.data || error.message);
        }   
    };
    fetchWallet();
  }, []);



//   const handlePaymentSubmit = (e) => {
//     e.preventDefault();
//     if (!paymentData.amount || !paymentData.description) return;

//     const newTransaction = {
//       id: transactions.length + 1,
//       type: paymentData.type,
//       amount: parseFloat(paymentData.amount),
//       description: paymentData.description,
//       date: new Date().toISOString().split('T')[0],
//       category: paymentData.category
//     };

//     setTransactions([newTransaction, ...transactions]);
//     setPaymentData({ type: 'out', amount: '', description: '', category: 'Other' });
//     setShowPaymentForm(false);
//   };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-black" />
              My Wallet
            </h1>
            <button
              onClick={() => setShowPaymentForm(true)}
              className="bg-black/90 hover:bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </button>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 ">
            {/* Total Balance */}
            <div className="bg-gradient-to-r from-black/90 to-gray-800 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium">Current Balance</p>
                  <p className="text-2xl font-bold">{formatCurrency(wallet?.balance)}</p>
                </div>
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Money In */}
            {/* <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Money In</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalIn)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </div> */}

            {/* Money Out */}
            {/* <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Money Out</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalOut)}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-200" />
              </div>
            </div> */}
          </div>
        </div>

        {/* Payment Form Modal
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Transaction</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                  <select
                    value={paymentData.type}
                    onChange={(e) => setPaymentData({...paymentData, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="out">Money Out (Expense)</option>
                    <option value="in">Money In (Income)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                  <input
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={paymentData.description}
                    onChange={(e) => setPaymentData({...paymentData, description: e.target.value})}
                    placeholder="What was this for?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={paymentData.category}
                    onChange={(e) => setPaymentData({...paymentData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Food">Food & Dining</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills & Utilities</option>
                    <option value="Income">Income</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPaymentForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    Add Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 my-9">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
          
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    transaction.description === 'income' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.description === 'income' ? 
                      <ArrowDownLeft className="w-5 h-5" /> : 
                      <ArrowUpRight className="w-5 h-5" />
                    }
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{transaction.description}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{transaction?.order?.id}</span>
                      <span className={transaction.description === 'income' ? 'hidden' : ``}>•</span>
                      <span>{(transaction.created_at).split('T')[0]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.description === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.description === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {transactions.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No transactions yet</p>
              <p className="text-gray-400">Add your first transaction to get started</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Spent</span>
                <span className="font-semibold text-red-600">{formatCurrency(totalOut)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Earned</span>
                <span className="font-semibold text-green-600">{formatCurrency(totalIn)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium">Net Change</span>
                <span className={`font-bold ${wallet?.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {wallet?.balance >= 0 ? '+' : ''}{formatCurrency(wallet?.balance)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setPaymentData({...paymentData, type: 'in'});
                  setShowPaymentForm(true);
                }}
                className="w-full bg-green-100 hover:bg-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors"
              >
                <ArrowDownLeft className="w-5 h-5" />
                Add Income
              </button>
              <button
                onClick={() => {
                  setPaymentData({...paymentData, type: 'out'});
                  setShowPaymentForm(true);
                }}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors"
              >
                <ArrowUpRight className="w-5 h-5" />
                Add Expense
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Wallet;