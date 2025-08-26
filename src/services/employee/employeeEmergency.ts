import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Opportunity } from "@/types";

const API_URL = "employee-emergencies";

export default {
  async fetchEmployeeEmergencies(payload?: Record<string, any>) {
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  async fetchEmployeeEmergencyById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}:`, error);
      throw error;
    }
  },

  async createEmployeeEmergency(payload: Omit<Opportunity, "id">) {
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },

  async updateEmployeeEmergency(id: number, payload: Partial<Omit<Opportunity, "id">>) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error(`Error updating employee with ID ${id}:`, error);
      throw error;
    }
  },
  
  async deleteEmployeeEmergency(id: number) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
      throw error;
    }
  },

};
