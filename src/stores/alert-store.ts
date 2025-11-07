import { defineStore } from 'pinia';

interface AlertOptions {
  text: string;
  type: string;
  timeout?: number;
}

export const useAlertStore = defineStore('alert', {
  state: () => ({
    text: '' as string,
    type: '' as string,
    isVisible: false as boolean,
  }),

  actions: {
    showAlert({ text, type, timeout = 3000 }: AlertOptions): Promise<void> {
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

    hideAlert(): void {
      this.isVisible = false;
    },
  },
});
