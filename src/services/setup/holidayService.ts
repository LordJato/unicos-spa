import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Holiday } from "@/types";

const API_URL = "setup/holidays";

export default {

  // Fetch all holidays
  async fetchHolidays(payload?: Record<string, any>) {
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching holidays:", error);
      throw error;
    }
  },

  // Fetch a single holiday by ID
  async fetchHolidayById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching holiday with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new holiday
  async createHoliday(payload: Omit<Holiday, "id">) {
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error creating holiday:", error);
      throw error;
    }
  },

  // Update an existing holiday
  async updateHoliday(id: number, payload: Partial<Omit<Holiday, "id">>) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error updating holiday with ID ${id}:`, error);
      throw error; 
    }
  }
};
