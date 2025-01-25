import axios from "axios";

// export const API_BASE_URL ="https://ecommerce-server-production-a391.up.railway.app"

export const API_BASE_URL = "http://localhost:8080"

// Create a base axios instance without the Authorization header
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Function to add the Authorization header for authenticated requests
export const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Set the JWT token from localStorage (if it exists)
const jwt = localStorage.getItem("jwt");
setAuthHeader(jwt);
