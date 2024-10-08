import { defineStore } from "pinia";

export const useThemeStore = defineStore('store', {
    state : () => ({
        getDarkTheme : localStorage.getItem('isDarkTheme') || 'false'
    }),

    getters : {
        isDarkTheme : (state) => state.getDarkTheme === 'true'
    },

    actions : {
        toggleDarkTheme(isDarkTheme){
            localStorage.setItem('isDarkTheme', isDarkTheme);
        }
    }
})