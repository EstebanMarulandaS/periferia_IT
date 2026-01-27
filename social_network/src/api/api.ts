import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const apiAuth = axios.create({
  baseURL: "http://localhost:3001",
});

const apiPosts = axios.create({
  baseURL: "http://localhost:3002",
});

apiAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiPosts.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { apiAuth, apiPosts, api };
