# Homefix - API Configuration Guide

## 🌐 Using the Ngrok URL

Your backend server is now configured to work with the ngrok URL: `https://nonexponential-repulsively-kip.ngrok-free.dev`

### What's Been Set Up

1. **API Configuration File** (`src/config/api.js`)
   - Centralized API endpoint configuration
   - Helper function for making API calls
   - Automatically includes ngrok headers to skip browser warnings

2. **Backend CORS Configuration** (`backend/server.js`)
   - Updated to accept requests from both localhost and ngrok URL
   - Supports credentials for authentication

3. **Environment Variables** (`backend/.env`)
   - Added `NGROK_URL` variable for easy updates

### How to Use

#### In Your React Components

```javascript
import { API_ENDPOINTS, apiCall } from "../config/api";

// Example: Login
const response = await apiCall(API_ENDPOINTS.AUTH.LOGIN, {
  method: "POST",
  body: JSON.stringify({ email, password }),
});

// Example: Register
const response = await apiCall(API_ENDPOINTS.AUTH.REGISTER, {
  method: "POST",
  body: JSON.stringify(userData),
});
```

#### Available Endpoints

- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **Logout**: `POST /api/auth/logout`
- **Verify**: `GET /api/auth/verify`
- **Health Check**: `GET /api/health`

### Testing the API

You can test if the API is working by visiting:

```
https://nonexponential-repulsively-kip.ngrok-free.dev/api/health
```

### Updating the Ngrok URL

When your ngrok URL changes (ngrok generates new URLs on restart), update it in two places:

1. **Frontend**: `src/config/api.js`

   ```javascript
   export const API_BASE_URL = "YOUR_NEW_NGROK_URL";
   ```

2. **Backend**: `backend/.env`
   ```
   NGROK_URL=YOUR_NEW_NGROK_URL
   ```

### Important Notes

- ✅ The ngrok URL is already configured in your code
- ✅ CORS is set up to accept requests from the ngrok URL
- ✅ The Login page has been updated to use the API configuration
- 🔄 Remember to restart your backend server after changing `.env` variables

### Next Steps

To integrate the API with other pages (like Provider Registration), follow the same pattern used in `Login.jsx`:

1. Import the API configuration
2. Use the `apiCall` helper function
3. Handle loading and error states
4. Store authentication tokens as needed

---

**Need Help?** Check the updated `Login.jsx` for a complete example of API integration.
