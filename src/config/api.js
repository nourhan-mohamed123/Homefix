
export const API_BASE_URL = 'https://nonexponential-repulsively-kip.ngrok-free.dev';

export const API_ENDPOINTS = {  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    REGISTER: `${API_BASE_URL}/auth/signup`, 
    REGISTER_PROVIDER: `${API_BASE_URL}/auth/signup`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    VERIFY: `${API_BASE_URL}/api/auth/verify`,
  },
  HEALTH: `${API_BASE_URL}/api/health`,
  CHK: `${API_BASE_URL}/chk`,
};

export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', 
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
