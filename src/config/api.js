
export const API_BASE_URL = 'https://nonexponential-repulsively-kip.ngrok-free.dev';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    REGISTER: `${API_BASE_URL}/auth/signup`,
    REGISTER_PROVIDER: `${API_BASE_URL}/auth/signup`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    VERIFY: `${API_BASE_URL}/api/auth/verify`,
  },
  HEALTH: `${API_BASE_URL}/api/health`,
  CHK: `${API_BASE_URL}/chk`,
  CITIES: `${API_BASE_URL}/city`,
  SERVICES: `${API_BASE_URL}/service`,
  CATEGORIES: `${API_BASE_URL}/category`,

  // ⏳ Pending backend confirmation — set to null until endpoint is ready
  REVIEWS: null,                // GET /reviews → { customer_name, service_name, rating, comment, avatar_url }
  FEATURED_SERVICES: null,      // GET /featured-services (or derive from /category?)
};

export const apiCall = async (url, options = { method: "GET" }) => {
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

    let body;
    try {
      body = await response.json();
    } catch {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
      }
      throw new Error('Invalid JSON response from server');
    }

    // API contract: { msg: 'Success', data: ... } on success
    //               { msg: '<error message>' } on 4xx / 5xx
    if (!response.ok) {
      throw new Error(body.msg || `Request failed: ${response.status}`);
    }

    // Return the inner `data` payload; callers don't need the envelope wrapper
    return body.data !== undefined ? body.data : body;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
