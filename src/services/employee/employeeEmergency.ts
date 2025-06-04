import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Opportunity } from "@/types"; // Note: The type import remains 'Opportunity' as it seems to define the data structure

const API_URL = "employee-emergencies"; // Changed API_URL

export default {
  // Fetch all employee emergency
  async fetchEmployeeEmergencies(payload?: Record<string, any>) { // Changed function name
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching employees:", error); // Changed error message
      throw error;
    }
  },

  // Fetch a single employee emergency by ID
  async fetchEmployeeEmergencyById(id: number) { // Changed function name
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

  // Create a new employee emergency
  async createEmployeeEmergency(payload: Omit<Opportunity, "id">) { // Changed function name
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error("Error creating employee:", error); // Changed error message
      throw error;
    }
  },

  // Update an existing employee emergency
  async updateEmployeeEmergency(id: number, payload: Partial<Omit<Opportunity, "id">>) { // Changed function name
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error(`Error updating employee with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

  // Delete an employee emergency
  async deleteEmployeeEmergency(id: number) { // Changed function name
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

};
