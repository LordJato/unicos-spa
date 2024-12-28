import { defineStore } from 'pinia';
import axios from '@/plugins/axios';
import router from '@/router'
import { unwrapResponse } from '@/utils/api';

const useAuthStore = defineStore('auth', {
  state: () => ({ accessToken: '' }),
  getters: {
    getAccessToken: (state) => state.accessToken,
  },
  actions: {
    setToken(token) {
      this.accessToken = token;
    },
    
    resetState() {
      this.$reset(); // Built-in Pinia method to reset state to its initial state
    },


    async refreshAccessToken() {
      try {

        const refreshToken = await axios.post('refresh-token');
        const response = unwrapResponse(refreshToken);

        if (response.success) {
          this.setToken(response.data.access_token);
        }

        return response;
      } catch (error) {
        // Log or handle the error if necessary
        console.error('Failed to refresh token:', error);
        return { success: false, data: null };
      }
    }
  },
  persist: {
    paths: ['accessToken'],
  },
});

export default useAuthStore;