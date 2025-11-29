import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true, // sends cookies automatically
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url.includes("/users/refresh-token")
    ) {
      localStorage.removeItem("user");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post(
            "http://localhost:4000/api/v1/users/refresh-token",
            {},
            { withCredentials: true }
          );

          isRefreshing = false;
          processQueue(null);

          resolve(api(originalRequest));
        } catch (err) {
          isRefreshing = false;
          processQueue(err, null);
          localStorage.removeItem("user");
          window.location.href = "/login";
          reject(err);
        }
      });
    }

    return Promise.reject(error);
  }
);

export default api;
