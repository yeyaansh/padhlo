import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: "http://10.21.12.34:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
