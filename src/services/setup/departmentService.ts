import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import { Department } from "@/types/department";

const API_URL = "setup/departments";

export default {
  
  // Fetch all departments
  async fetchDepartments(payload?: Record<string, any>) {
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  },

  // Fetch a single department by ID
  async fetchDepartmentById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching department with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new department
  async createDepartment(payload: Omit<Department, "id">) {
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error creating department:", error);
      throw error;
    }
  },

  // Update an existing department
  async updateDepartment(id: number, payload: Partial<Omit<Department, "id">>) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error updating department with ID ${id}:`, error);
      throw error; 
    }
  },

  // Delete a department
  async deleteDepartment(id: number) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting department with ID ${id}:`, error);
      throw error;
    }
  },
};