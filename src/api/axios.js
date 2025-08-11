import axios from "axios";

const api = axios.create({
  baseURL: "http://kovecaps_api.test/", // Laravel base URL
  withCredentials: true, // important for Sanctum cookies
    headers: {
    "Content-Type": "application/json",
  },
});

export default api;
