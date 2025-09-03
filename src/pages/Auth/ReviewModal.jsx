import React, { useEffect, useState } from "react";
import axios from "../../api/axios"; 
import { useToast } from "../../context/ToastContext";

const ReviewModal = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewStatus, setReviewStatus] = useState(null);
  const [formData, setFormData] = useState({
    comment: "",
    rating: ""
  });
  const { showToast } = useToast();

  const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setReviewStatus(res.data.review_status);
        console.log(res.data.review_status);

        if (res.data.review_status === '1') {
          setTimeout(() => setShow(true), 20000); // wait 20s then show modal
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    const handler = () => fetchUser();
    window.addEventListener("reviewStatusUpdated", handler);

    return () => {
      window.removeEventListener("reviewStatusUpdated", handler);
    };
  }, []);


  const handleAction = async (action) => {
    try {
      await axios.post(
        "/api/user/review-status",
        { status: action }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setShow(false);
      showToast("Your review has been saved.", "success");
    } catch (err) {
      console.error("Failed to update review status:", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/reviews",
        { comment: formData.comment, rating: formData.rating },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
        setFormData({ review: "", rating: "" });
        setShow(false);
        handleAction("stop"); // stop showing modal after review
    } catch (err) {
        console.error("Failed to submit review:", err);
        console.log(formData);

    }
  };
console.log(show);

  if (loading || !show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white border-2 border-black p-8 rounded-lg shadow-2xl w-96 max-w-[90vw] text-center">
        {/* Header */}
        <form onSubmit={handleSubmit}>
             <div className="mb-6">
           <div className="w-8 h-8 bg-gradient-to-r m-auto mb-2 from-black to-slate-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
          <h2 className="text-2xl font-bold text-black mb-2">Share Your Experience</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Your feedback helps us improve and helps other customers make informed decisions
          </p>
        </div>

        {/* Review Input */}
        <div className="mb-6">
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Give a rating (1-5)"
            className="w-full border-2 border-black rounded-md p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent  text-sm"
          />
        </div>
        {/* Review Input */}
        <div className="mb-6">
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Tell us about your experience..."
            className="w-full border-2 border-black rounded-md p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none h-24 text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Primary Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200 text-sm"
          >
            Submit Review
          </button>

          {/* Secondary Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => handleAction(0)}
              className="flex-1 bg-white text-black px-4 py-2 rounded-md border-2 border-black font-medium hover:bg-gray-50 transition-colors duration-200 text-sm"
            >
              Maybe Later
            </button>

            <button
              onClick={() => handleAction("stop")}
              className="flex-1 bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-300 font-medium hover:bg-gray-50 hover:text-black transition-colors duration-200 text-sm"
            >
              Don't Ask Again
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;