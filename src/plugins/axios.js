import axios from 'axios';
import router from '@/router';
import useAuthStore from '@/stores/useAuthStore';


const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const accessToken = authStore.getAccessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    const configError = error.config;

    // Handle 401 Unauthorized: Attempt token refresh
    if (error.response?.status === 401 && !configError._retry) {
      configError._retry = true; // Prevent infinite retry loops

      try {
        const refreshResponse = await authStore.refreshAccessToken();
        console.log("refreshResponse", refreshResponse)
        const newAccessToken = refreshResponse.data.access_token;

        // Save new token and retry the failed request
        authStore.setToken(newAccessToken);
        configError.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(configError);
      } catch (refreshError) {
        // If token refresh fails, reset state and redirect to login
        authStore.resetState();
        router.push({ name: 'Login' });
        return Promise.reject(refreshError);
      }
    }

    // Handle 404: Refresh token endpoint not found
    if (error.response?.status === 404 && configError.url === 'refresh-token') {
      authStore.resetState();
      router.push({ name: 'Login' });
    }

    // Handle 500: Authentication expired
    if (error.response?.status === 500 && configError.url === 'refresh-token') {
      if (confirm('Authentication Expired. Please re-login.')) {
        authStore.resetState();
        router.push({ name: 'Login' });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
