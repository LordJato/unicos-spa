import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Opportunity } from "@/types";

const API_URL = "employees";

export default {
  async fetchEmployees(payload?: Record<string, any>) {
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  async fetchEmployeeById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}:`, error);
      throw error;
    }
  },

  async createEmployee(payload: Omit<Opportunity, "id">) {
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },

  async updateEmployee(id: number, payload: Partial<Omit<Opportunity, "id">>) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error(`Error updating employee with ID ${id}:`, error);
      throw error;
    }
  },

  async deleteEmployee(id: number) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
      throw error;
    }
  },
  
  async fetchOpportunityTypes() {
    try {
      const response = await axios.get("opportunity-types");
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error("Error fetching opportunity types:", error);
      throw error;
    }
  },
};
