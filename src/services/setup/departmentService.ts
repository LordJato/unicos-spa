import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";

interface Department {
    id: number;
    companyId: number | null;
    name: string;
  }
  

const API_URL = "setup/departments"; // Adjust the prefix as needed

export default {
  // Fetch all departments
  async fetchDepartments(payload?: Record<string, any>) {
    const response = await axios.get(API_URL, { params: payload });
    return unwrapSuccessResponse(response).data.records;
  },

  // Fetch a single department by ID
  async fetchDepartmentById(id: number) {
    const response = await axios.get(`${API_URL}/${id}`);
    return unwrapSuccessResponse(response).data;
  },

  // Create a new department
  async createDepartment(payload: Omit<Department, "id">) {
    const response = await axios.post(API_URL, payload);
    return unwrapSuccessResponse(response).data.records;
  },

  // Update an existing department
  async updateDepartment(id: number, payload: Partial<Omit<Department, "id">>) {
    const response = await axios.put(`${API_URL}/${id}`, payload);
    return unwrapSuccessResponse(response).data;
  },

  // Delete a department
  async deleteDepartment(id: number) {
    await axios.delete(`${API_URL}/${id}`);
  },
};
