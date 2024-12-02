import { defineStore } from 'pinia';

const useAuthStore = defineStore('auth', {
    state: () => ({ accessToken: '' }),
    getters: {
        getAccessToken: (state) => state.accessToken,
    },
    actions: {
        setToken(token) {
            this.accessToken = token;
        },
    },
    persist: {
        paths: ['accessToken'],
    },
});

export default useAuthStore;