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

      const refreshAccessToken = await authStore.refreshAccessToken();

      const newRefreshToken = refreshAccessToken.data.access_token

      authStore.setToken(newRefreshToken);
      configError.headers['Authorization'] = `Bearer ${newRefreshToken}`;
      return instance(configError);
    }


    if (error.response?.status === 404) {
      if( configError.url === "refresh-token"){
        authStore.resetState();
        router.push({name: "login"})
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 500) {
      if( configError.url === "refresh-token"){
        if(confirm("Authentication Expired. Please relogin")){
          authStore.resetState();
          router.push({name: "login"})
          return Promise.reject(error);
        }
      }
    
    }

    // Reject any other errors
    return Promise.reject(error);
  }
);

export default instance