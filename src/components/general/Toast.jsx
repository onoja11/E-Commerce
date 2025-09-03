import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-6 py-4 rounded shadow-lg text-white font-medium z-900
        ${type === "success" ? "bg-green-600/90" : "bg-red-600/90"}`}
    >
      {message}
    </div>
  );
};

export default Toast;
