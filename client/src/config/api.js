const getApiBaseUrl = () => {
  // If VITE_API_URL is defined (e.g. from render.yaml), use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // If we are in production but VITE_API_URL is missing, fallback to the expected Render URL
  if (import.meta.env.PROD) {
    console.warn("VITE_API_URL is missing in production. Falling back to default Render URL.");
    return "https://carehire-server.onrender.com";
  }

  // Default to local development URL
  return "http://localhost:5000";
};

export const API_BASE_URL = getApiBaseUrl();

export const getApiUrl = (endpoint) => {
  // Ensure endpoint starts with / if not present
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}/api${path}`;
};
