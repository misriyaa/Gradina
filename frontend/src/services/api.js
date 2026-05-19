import axios from 'axios';

const rawBackendUrl = import.meta.env.VITE_RENDER_BACKEND_URL;

const BACKEND_URL = rawBackendUrl && rawBackendUrl !== "undefined"
  ? rawBackendUrl 
  : import.meta.env.PROD
    ? 'https://gradina-n5mv.onrender.com'
    : 'http://localhost:5000';

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  // ✅ Removed withCredentials: true — not needed for JWT auth,
  // and it was causing the CORS wildcard conflict
});

// ✅ Attach JWT token to every request via Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;