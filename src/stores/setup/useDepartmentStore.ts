import axios from "@/plugins/axios";
import { defineStore } from "pinia";
import { unwrapSuccessResponse } from "@/utils/api";

interface Department {
  id: number;
  companyId: number;
  name: string;
}

interface State {
  departments: Department[];
  selectedDepartment: Department | null;
}

export const useDepartmentStore = defineStore("department", {
  state: (): State => ({
    departments: [],
    selectedDepartment: null,
  }),
  actions: {
    // Fetch all departments
    async fetchDepartment(payload?: Record<string, any>): Promise<void> {
      try {
        const request = await axios.get("departments", { params: payload });
        const response = unwrapSuccessResponse(request);
        this.departments = response.data.records as Department[];
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    },
    // Fetch a single department by ID
    async fetchDepartmentById(id: number): Promise<void> {
      try {
        const response = await axios.get(`departments/${id}`);
        this.selectedDepartment = unwrapSuccessResponse(response)
          .data as Department;
      } catch (error) {
        console.error(`Failed to fetch department with ID ${id}:`, error);
        throw error;
      }
    },
    // Create a new department
    async createDepartment(payload: Omit<Department, "id">): Promise<void> {
      try {
        const request = await axios.post("departments", payload);
        const response = unwrapSuccessResponse(request);
        this.departments.push(response.data.records as Department);
      } catch (error) {
        console.error("Failed to create department:", error);
      }
    },

    //Update an existing department
    async updateDepartment(
      id: number,
      payload: Partial<Omit<Department, "id">>
    ): Promise<void> {
      try {
        const response = await axios.put(`departments/${id}`, payload);
        const updatedDepartment = unwrapSuccessResponse(response)
          .data as Department;

        const index = this.departments.findIndex((dept : Department) => dept.id === id);
        if (index !== -1) {
          this.departments[index] = updatedDepartment;
        }

        if (this.selectedDepartment?.id === id) {
          this.selectedDepartment = updatedDepartment;
        }
      } catch (error) {
        console.error(`Failed to update department with ID ${id}:`, error);
        throw error;
      }
    },

    //Delete Department
    async deleteDepartment(id: number): Promise<void> {
      try {
        await axios.delete(`departments/${id}`);

        this.departments = this.departments.filter((dept : Department) => dept.id !== id);

        if (this.selectedDepartment?.id === id) {
          this.selectedDepartment = null;
        }
      } catch (error) {
        console.error(`Failed to delete department with ID ${id}:`, error);
        throw error;
      }
    },
  },
});

export default useDepartmentStore;
