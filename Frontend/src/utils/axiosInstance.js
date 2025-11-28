import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});

// 🔥 Axios Interceptor for Access Token Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired → try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/users/refresh-token"); // <-- backend route
        return api(originalRequest); // retry old request
      } catch (err) {
        console.log("Refresh token expired:", err.message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
