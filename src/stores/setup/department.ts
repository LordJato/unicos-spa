import axios from "@/plugins/axios";
import { defineStore } from "pinia";
import { unwrapSuccessResponse } from "@/utils/api";

interface Department {
  id: number;
  companyId : number
  name: string;
}

interface State {
  departments: Department[];
}

export const useDepartmentStore = defineStore("department", {
  state: (): State => ({
    departments: [],
  }),
  actions: {
    async getAll(payload?: Record<string, any>): Promise<void> {
      try {
        const getAllDepartment = await axios.get("departments", { params: payload });
        const response = unwrapSuccessResponse(getAllDepartment);
        this.departments = response.data as Department[];
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    },
    async create(payload: Omit<Department, "id">): Promise<void> {
      try {
        const createDepartment = await axios.post("departments/create", payload);
        const response = unwrapSuccessResponse(createDepartment);
        this.departments.push(response.data as Department);
      } catch (error) {
        console.error("Failed to create department:", error);
      }
    },
  },
});

export default useDepartmentStore;
