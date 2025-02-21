import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';
import useAuthStore from '@/stores/useAuthStore';

interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshTokenResponse {
  data: {
    access_token: string;
  };
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const authStore = useAuthStore();
    const configError = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status === 401 && !configError._retry) {
      configError._retry = true;
      try {
        const refreshResponse = await authStore.refreshAccessToken() as RefreshTokenResponse;
        const newAccessToken: string = refreshResponse.data.access_token;

        authStore.setToken(newAccessToken);
        if (configError.headers) {
          configError.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return instance(configError);
      } catch (refreshError) {
        authStore.resetState();
        router.push({ name: 'Login' });
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 404 && configError.url === 'refresh-token') {
      authStore.resetState();
      router.push({ name: 'Login' });
    }

    if (error.response?.status === 500 && configError.url === 'refresh-token') {
      if (confirm('Authentication Expired. Please re-login.')) {
        authStore.resetState();
        router.push({ name: 'Login' });
      }
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default instance;
