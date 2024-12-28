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
    if (error.response?.status === 401 && !configError._retry) {
      configError._retry = true;
      try {
        const newAccessToken = await authStore.refreshAccessToken();
     
        if (!newAccessToken.success) {
          router.push({ name: 'login' });
        }
        configError.headers['Authorization'] = `Bearer ${newAccessToken.data.access_token}`;
        return axios(configError);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }

    }

    return Promise.reject(error);
  }
);

export default instance