import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Opportunity } from "@/types"; // Note: The type import remains 'Opportunity' as it seems to define the data structure

const API_URL = "employee-childrens"; // Changed API_URL

export default {
  // Fetch all employee children
  async fetchEmployeeChildrens(payload?: Record<string, any>) { // Changed function name
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching employees:", error); // Changed error message
      throw error;
    }
  },

  // Fetch a single employee child by ID
  async fetchEmployeeChildrenById(id: number) { // Changed function name
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

  // Create a new employee child
  async createEmployeeChildren(payload: Omit<Opportunity, "id">) { // Changed function name
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error("Error creating employee:", error); // Changed error message
      throw error;
    }
  },

  // Update an existing employee child
  async updateEmployeeChildren(id: number, payload: Partial<Omit<Opportunity, "id">>) { // Changed function name
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error(`Error updating employee with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

  // Delete an employee child
  async deleteEmployeeChildren(id: number) { // Changed function name
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },
};
