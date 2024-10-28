import { defineStore } from "pinia";
import axios from '@/plugins/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false || Boolean(localStorage.getItem('accessToken')),
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
        const response = await axios.post('login', payload);
        const accessToken = response.data.data.access_token;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
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