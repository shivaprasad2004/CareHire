const getApiBaseUrl = () => {
  let url;
  // If VITE_API_URL is defined (e.g. from render.yaml), use it
  if (import.meta.env.VITE_API_URL) {
    url = import.meta.env.VITE_API_URL;
  } else if (import.meta.env.PROD) {
    // If we are in production but VITE_API_URL is missing, fallback to the expected Render URL
    console.warn("VITE_API_URL is missing in production. Falling back to default Render URL.");
    url = "https://carehire-server.onrender.com";
  } else {
    // Default to local development URL
    url = "http://localhost:5000";
  }

  // Remove trailing slash if present to avoid double slashes in constructed URLs
  return url.replace(/\/$/, "");
};

export const API_BASE_URL = getApiBaseUrl();

export const getApiUrl = (endpoint) => {
  // Ensure endpoint starts with / if not present
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}/api${path}`;
};
