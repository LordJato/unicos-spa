import axios from 'axios'
import router from '@/router'
import useAuthStore from '@/stores/auth';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

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
    const configError = error.config;
    const authStore = useAuthStore();


    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !configError._retry) {
      configError._retry = true; // Prevent further retries for this request
      try {
       
        // const newAccessToken = await authStore.refreshAccessToken();
        // if (!newAccessToken.success) {
        //   // If refresh token fails, redirect to login and stop further processing
        //   router.push({ name: 'login' });
        //   return Promise.reject(new Error('Refresh token invalid'));
        // }

        // // Update authorization header and retry the request
        // configError.headers['Authorization'] = `Bearer ${newAccessToken.data.access_token}`;
        return instance(configError);
      } catch (refreshError) {
        // Explicitly reject when refresh fails
        router.push({ name: 'login' });
        return Promise.reject(refreshError);
      }
    }

    // Reject any other errors
    return Promise.reject(error);
  }
);

export default instance