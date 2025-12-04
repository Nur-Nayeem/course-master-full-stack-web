import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { token, logout } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const storedToken = token || localStorage.getItem("token");

        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Optional: Handle 401 responses
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired → logout user
          logout?.();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup when unmounting
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [token, logout]);

  return axiosSecure;
};

export default useAxiosSecure;
