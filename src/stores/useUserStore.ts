import axios from '@/plugins/axios';
import { defineStore } from "pinia";
import { unwrapSuccessResponse } from '@/utils/apiResponse';
import { useAuthStore } from './useAuthStore';
import router from '@/router';

interface UserDetails {
  id?: number;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false as boolean,
    userDetails: {} as UserDetails
  }),
  
  actions: {
    async registerUser(payload: Record<string, any>): Promise<ApiResponse> {
      try {
        const response = await axios.post('register', payload);
        return response.data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },

    async loginUser(payload: Record<string, any>): Promise<ApiResponse> {
      try {
        const login = await axios.post('login', payload);
        const response: ApiResponse<{ access_token: string }> = unwrapSuccessResponse(login);

        if (response.success) {
          const authStore = useAuthStore();
          authStore.setToken(response.data.access_token);
          this.isLoggedIn = true;
          await this.profile();
        } else {
          throw new Error('Login failed');
        }

        return response;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },

    async logoutUser(): Promise<ApiResponse> {
      try {
        const logout = await axios.post('logout');
        const response: ApiResponse = unwrapSuccessResponse(logout);
        const authStore = useAuthStore();

        if (response.success) {
          authStore.resetState();
          router.push({ name: 'Login' });
        }

        return response;
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },

    async profile(): Promise<ApiResponse<UserDetails>> {
      try {
        const profile = await axios.get('user');
        const response: ApiResponse = unwrapSuccessResponse(profile).data
        this.userDetails = response;
        return response;
      } catch (error) {
        console.error('Profile error:', error);
        throw error;
      }
    },
  },
});
