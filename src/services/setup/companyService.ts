import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Company } from "@/types/company";

const API_URL = "setup/companies";

export default {

  // Fetch all companies
  async fetchCompanies(payload?: Record<string, any>) {
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching companies:", error);
      throw error;
    }
  },

  // Fetch a single company by ID
  async fetchCompanyById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching company with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new company
  async createCompany(payload: Omit<Company, "id">) {
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error creating company:", error);
      throw error;
    }
  },

  // Update an existing company
  async updateCompany(id: number, payload: Partial<Omit<Company, "id">>) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error updating company with ID ${id}:`, error);
      throw error; 
    }
  },

  // Delete a company
  async deleteCompany(id: number) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting company with ID ${id}:`, error);
      throw error;
    }
  },
};