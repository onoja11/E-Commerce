import React, { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import { CreditCard, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";
import axios from "../../api/axios";
import PaymentButton from "../../components/wallet/PaymentButton";
import { useLocation } from "react-router-dom";

const Wallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const { showToast } = useToast();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const reference = queryParams.get("reference");

  const fetchWallet = async () => {
    try {
      const res = await axios.get("/api/wallets/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWallet(res.data.wallet);
      setTransactions(res.data.transactions || []);
    } catch (error) {
      console.error("Error fetching wallet:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  useEffect(() => {
    if (status === "success") {
      showToast("Wallet funded successfully", "success");

      fetchWallet(); // refresh after success
    } else if (status === "failed") {
      alert(" Payment failed. Please try again.");
      showToast("Wallet funding failed", "error");

    }
  }, [status, reference, showToast]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount || 0);
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

            {/* Open Modal Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black rounded text-white  shadow hover:bg-black/70 transition"
            >
              <Plus className="w-5 h-5" />
              Add Funds
            </button>
          </div>

          {/* Balance */}
          <div className="bg-gradient-to-r from-black/90 to-gray-800 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Current Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(wallet?.balance)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 my-9">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h2>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      transaction.description === "income"
                        ? "bg-green-100 text-green-600"
                        : transaction.description === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.description === "income" || transaction.description === "pending"  ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    )
                    :(
                       <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{transaction.description}</h3>
                    <p className="text-sm text-gray-500">
                      {transaction.created_at.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      transaction.description === "income"
                        ? "text-green-600"
                        : transaction.description === "pending" 
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.description === "income" ? "+" :
                    transaction.description === "pending" ? "" :
                    "-"}
                    {formatCurrency(transaction.amount)}
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Enter Amount</h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Payment Button with Dynamic Amount */}
            <PaymentButton
              amount={Number(amount)}

            />

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
