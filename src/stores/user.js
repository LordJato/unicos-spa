import { defineStore } from "pinia";
import axios from '@/plugins/axios';

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
                const response = await axios.post('register', payload);
                return response;
            } catch (error) {
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
                    return response;
                } else {
                    throw new Error('Login failed'); // More specific error message
                }
            } catch (error) {
                throw error;
            }
        },

        async profile() {
            try {
                const response = await axios.get('user/profile');
                this.userDetails = response.data.data;
                return response;
            } catch (error) {
                throw error;
            }
        },
    },
})