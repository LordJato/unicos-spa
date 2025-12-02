import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";

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

  async deleteEmployeeEmergency(id: number) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
      throw error;
    }
  },

};
