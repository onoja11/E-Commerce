import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-api-1-nsvz.onrender.com", 
  withCredentials: true, 
    headers: {
    "Content-Type": "application/json",
  },
});


export default api;
