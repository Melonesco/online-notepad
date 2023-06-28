import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://online-notepad-ten.vercel.app",
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
