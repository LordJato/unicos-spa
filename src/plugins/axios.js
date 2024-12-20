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
    const authStore = useAuthStore(); // Use inside a component or async context
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
  (error) => {
    console.log("response error", error)
    if (error.response.status === 401) {
      router.push('/login');
    } else {
      alert('An error occurred. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default instance