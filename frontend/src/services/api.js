import axios from 'axios';

// ✅ Clean up the variable and fall back to localhost if it's missing
const rawBackendUrl = import.meta.env.VITE_RENDER_BACKEND_URL;

// This ensures we never append "undefined" into your network string paths
const BACKEND_URL = rawBackendUrl && rawBackendUrl !== "undefined"
  ? rawBackendUrl 
  : 'http://localhost:5000';

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true, // Crucial for sessions/cookies cross-origin
});

export default api;