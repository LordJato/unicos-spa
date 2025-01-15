import { defineStore } from 'pinia';

export const useAlertNotificationStore = defineStore('alertNotification', {
    state: () => ({
        text: '',
        type: 'success',
        isVisible: false,
    }),
    actions: {
        showAlert({ text, type, timeout = 3000 }) {
            this.text = text;
            this.type = type;
            this.isVisible = true;

            setTimeout(() => {
                this.hideAlert();
            }, timeout);
        },
        hideAlert() {
            this.isVisible = false;
        },
    },
});