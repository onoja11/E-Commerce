import axios from "axios";

const api = axios.create({
  baseURL: "http://kovecaps_api.test/", 
  withCredentials: true, 
    headers: {
    "Content-Type": "application/json",
  },
});


export default api;
