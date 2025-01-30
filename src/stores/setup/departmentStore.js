import axios from '@/plugins/axios';
import { defineStore } from 'pinia';
import { unwrapSuccessResponse } from '@/utils/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({ departments: [] }),
  getters: {
  },
  actions: {
    async create(){
        try {
            const createDepartment = await axios.post('departments/create');
            const response = unwrapSuccessResponse(createDepartment);
            this.departments = response.data

          } catch (error) {
            console.log('Failed to refresh token:', error);
          }
    }
  },

});

export default useAuthStore;