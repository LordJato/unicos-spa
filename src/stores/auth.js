import axios from '@/plugins/axios';
import { defineStore } from 'pinia';
import { unwrapResponse } from '@/utils/api';

export const useAuthStore = defineStore('auth', {
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
        return unwrapResponse(refreshToken);

      } catch (error) {
        console.log('Failed to refresh token:', error);

      }
    }
  },
  persist: {
    paths: ['accessToken'],
  },
});

export default useAuthStore;