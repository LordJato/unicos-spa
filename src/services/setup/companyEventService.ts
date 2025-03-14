import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Company } from "@/types/company";

const API_URL = "setup/company-event";

export default {

  // Fetch all company event
  async fetchCompanyEvents(payload?: Record<string, any>) {
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching company events:", error);
      throw error;
    }
  },

  // Fetch a single company event by ID
  async fetchCompanyEventById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching company event with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new company event
  async createCompanyEvent(payload: Omit<Company, "id">) {
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error creating company event:", error);
      throw error;
    }
  },

  // Update an existing company event
  async updateCompanyEvent(id: number, payload: Partial<Omit<Company, "id">>) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error updating company event with ID ${id}:`, error);
      throw error; 
    }
  },

  // Delete a company event
  async deleteCompany(id: number) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting company event with ID ${id}:`, error);
      throw error;
    }
  },
};