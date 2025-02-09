import axios from '@/plugins/axios';
import { defineStore } from 'pinia';
import { unwrapSuccessResponse } from '@/utils/apiResponse';

interface AuthState {
  accessToken: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({ accessToken: '' }),
  actions: {
    setToken(token: string): void {
      this.accessToken = token;
    },

    resetState(): void {
      this.$reset();
    },

    async refreshAccessToken(): Promise<object | null> {
      try {
        const refreshToken = await axios.post('refresh-token');
        return unwrapSuccessResponse<object>(refreshToken);
      } catch (error) {
        console.error('Failed to refresh token:', error);
        return null;
      }
    }
  },
  persist: {
    storage: localStorage,
    pick: ['accessToken'],
  },
});

export default useAuthStore;
