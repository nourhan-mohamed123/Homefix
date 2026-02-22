// API Configuration
// Using Cloudflare tunnel for external access
export const API_BASE_URL = 'https://achievement-dash-nov-pink.trycloudflare.com';

// API endpoints
// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    REGISTER: `${API_BASE_URL}/auth/signup`, // Unified signup (or keep as register if needed, matched to signup for now)
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    VERIFY: `${API_BASE_URL}/api/auth/verify`,
  },
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`,
  // Quick check
  CHK: `${API_BASE_URL}/chk`,
};

// Helper function to make API calls
export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Send/receive cookies for auth
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning
        ...options.headers,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
      }
      throw new Error('Invalid JSON response from server');
    }

    if (!response.ok) {
      throw new Error(data.msg || data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
