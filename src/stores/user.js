import axios from '@/plugins/axios';
import { defineStore } from "pinia";
import { unwrapResponse } from '@/utils/api';
import useAuthStore from './auth';
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userDetails: {}
  }),
  getters: {
    getUserDetails: (state) => state.userDetails,
  },
  actions: {
    async registerUser(payload) {
      try {
        return await axios.post('register', payload);
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },

    async loginUser(payload) {
      try {
        const login = await axios.post('login', payload);
        const response = unwrapResponse(login);
        if (response.success) {
          const authStore = useAuthStore();
          authStore.setToken(response.data.access_token)
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

    async logoutUser() {
      try {
        const logout = await axios.post('logout');
        const response = unwrapResponse(logout);
        const authStore = useAuthStore();

        if(response.success){
          authStore.resetState();
          router.push({name : 'login'})
        }

        return response;
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },

    async profile() {
      try {
        const response = await axios.get('user/profile');
        this.userDetails = response.data.data;
        return response;
      } catch (error) {
        console.error('Profile error:', error);
        throw error;
      }
    },
  },
});