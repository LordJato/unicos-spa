import { defineStore } from "pinia";
import axios from '@/plugins/axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        userDetails: {}
    }),
    getters: {
        getUserDetails : (state) => state.userDetails
    },
    actions: {
        registerUser(payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('register', payload)
                    .then((response) => {
                        if (response.data) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
        },

        loginUser(payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('login', payload)
                    .then((response) => {
                        const accessToken = response.data.data.content.access_token;
                        if (accessToken) {
                            localStorage.setItem('token', accessToken);
                            this.isLoggedIn = true;
                            this.profile().then(() => resolve(response));
                        } else { 
                            reject(response);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
        },

        profile() {
            return new Promise((resolve, reject) => {
                axios
                    .get('user/profile')
                    .then((response) => {
                        this.userDetails = response.data.data;
                        resolve(response);
                    })
                .catch((error) => {
                        reject(error);
                    })
            })
        },
    },
})