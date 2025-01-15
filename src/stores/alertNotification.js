import { defineStore } from 'pinia';

export const useAlertNotificationStore = defineStore('alertNotification', {
    state: () => ({
        text: '',
        type: 'success',
        isVisible: false,
    }),
    actions: {
        showAlert({ text, type, timeout = 3000 }) {
            return new Promise((resolve) => {
                this.text = text;
                this.type = type;
                this.isVisible = true;

                setTimeout(() => {
                    this.isVisible = false;
                    resolve();
                }, timeout);
            });
        },
        hideAlert() {
            this.isVisible = false;
        },
    },
});