import axios from "@/plugins/axios";
import { defineStore } from "pinia";
import { unwrapSuccessResponse } from "@/utils/api";

export const useDepartmentStore = defineStore("department", {
  state: () => ({ departments: [] }),
  getters: {},
  actions: {
    async getAll(payload) {
      try {
        const getAllDepartment = await axios.get("departments", payload);
        const response = unwrapSuccessResponse(getAllDepartment);
        this.departments = response.data;
      } catch (error) {
        console.log("Failed to refresh token:", error);
      }
    },
    async create(payload) {
      try {
        const createDepartment = await axios.post("departments/create", payload);
        const response = unwrapSuccessResponse(createDepartment);
        this.departments.push(response.data);
      } catch (error) {
        console.log("Failed to refresh token:", error);
      }
    },
  },
});

export default useAuthStore;
