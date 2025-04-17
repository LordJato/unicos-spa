import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Opportunity } from "@/types";

const API_URL = "opportunities";

export default {
  // Fetch all opportunities
  async fetchOpportunities(payload?: Record<string, any>) {
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      throw error;
    }
  },

  // Fetch a single opportunity by ID
  async fetchOpportunityById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching opportunity with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new opportunity
  async createOpportunity(payload: Omit<Opportunity, "id">) {
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error("Error creating opportunity:", error);
      throw error;
    }
  },

  // Update an existing opportunity
  async updateOpportunity(id: number, payload: Partial<Omit<Opportunity, "id">>) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error(`Error updating opportunity with ID ${id}:`, error);
      throw error; 
    }
  },

  // Delete an opportunity
  async deleteOpportunity(id: number) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting opportunity with ID ${id}:`, error);
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
