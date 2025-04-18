import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Opportunity } from "@/types";

const API_URL = "opportunity-benefits"; // Changed API_URL

export default {
  // Fetch all opportunity benefits
  async fetchOpportunityBenefits(payload?: Record<string, any>) { // Changed function name
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching opportunity benefits:", error); // Changed error message
      throw error;
    }
  },

  // Fetch a single opportunity benefit by ID
  async fetchOpportunityBenefitById(id: number) { // Changed function name
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching opportunity benefit with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

  // Create a new opportunity benefit
  async createOpportunityBenefit(payload: Omit<Opportunity, "id">) { // Changed function name
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error("Error creating opportunity benefit:", error); // Changed error message
      throw error;
    }
  },

  // Update an existing opportunity benefit
  async updateOpportunityBenefit(id: number, payload: Partial<Omit<Opportunity, "id">>) { // Changed function name
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error(`Error updating opportunity benefit with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

  // Delete an opportunity benefit
  async deleteOpportunityBenefit(id: number) { // Changed function name
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting opportunity benefit with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

  // Fetch all opportunity types
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