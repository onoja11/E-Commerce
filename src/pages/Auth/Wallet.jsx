import React, { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import { CreditCard, ArrowUpRight, ArrowDownLeft, Plus, Loader2, X } from "lucide-react";
import axios from "../../api/axios";
import PaymentButton from "../../components/wallet/PaymentButton";
// import { useLocation } from "react-router-dom";

const Wallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  // const { showToast } = useToast();

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const status = queryParams.get("status");
  // const reference = queryParams.get("reference");

  const fetchWallet = async () => {
    try {
      setIsLoading(true);
      setIsTransactionsLoading(true);
      const res = await axios.get("/api/wallets/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWallet(res.data.wallet);
      setTransactions(res.data.transactions || []);
    } catch (error) {
      console.error("Error fetching wallet:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
      setIsTransactionsLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  // useEffect(() => {
  //   if (status === "success") {
  //     fetchWallet();
  //     showToast("Wallet funded successfully", "success");
  //   } else if (status === "failed") {
  //     showToast("Wallet funding failed", "error");
  //   }
  // }, [status, reference, showToast]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount || 0);
  };

  const closeModal = () => {
    setShowModal(false);
    setAmount("");
  };

  // Wallet Balance Loading Skeleton
  const WalletSkeleton = () => (
    <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl p-4 sm:p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-400 rounded w-32"></div>
        </div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded"></div>
      </div>
    </div>
  );

  // Transaction Loading Skeleton
  const TransactionSkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-xl animate-pulse"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br mt-12 sm:mt-16 from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              <span className="truncate">My Wallet</span>
            </h1>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-black rounded-lg text-white shadow hover:bg-black/70 transition-colors w-full sm:w-auto text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Funds
            </button>
          </div>

          {/* Balance */}
          {isLoading ? (
            <WalletSkeleton />
          ) : (
            <div className="bg-gradient-to-r from-black/90 to-gray-800 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-indigo-100 text-xs sm:text-sm font-medium mb-1">
                    Current Balance
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
                    {formatCurrency(wallet?.balance)}
                  </p>
                </div>
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-white flex-shrink-0 ml-4" />
              </div>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
              Recent Transactions
            </h2>
            {isTransactionsLoading && (
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
            )}
          </div>

          <div className="space-y-2 sm:space-y-3">
            {isTransactionsLoading ? (
              <TransactionSkeleton />
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div
                      className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${
                        transaction.description === "income"
                          ? "bg-green-100 text-green-600"
                          : transaction.description === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.description === "income" ||
                      transaction.description === "pending" ? (
                        <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {transaction.description}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {transaction.created_at.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 ml-2">
                    <p
                      className={`text-sm sm:text-lg font-bold ${
                        transaction.description === "income"
                          ? "text-green-600"
                          : transaction.description === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      <span className="hidden sm:inline">
                        {transaction.description === "income"
                          ? "+"
                          : transaction.description === "pending"
                          ? ""
                          : "-"}
                      </span>
                      <span className="block sm:inline">
                        {formatCurrency(transaction.amount)}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <CreditCard className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-base sm:text-lg mb-1">No transactions yet</p>
                <p className="text-gray-400 text-sm sm:text-base">
                  Add your first transaction to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Enter Amount</h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
              autoFocus
            />

            <div className="mb-4">
              <PaymentButton amount={Number(amount) || 0} />
            </div>

            <button
              onClick={closeModal}
              className="w-full px-4 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-base"
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