import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Opportunity } from "@/types";

const API_URL = "opportunity-requirements"; // Changed API_URL

export default {
  async fetchOpportunityRequirements(payload?: Record<string, any>) { // Changed function name
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching opportunity requirements:", error); // Changed error message
      throw error;
    }
  },

  // Fetch a single opportunity requirement by ID
  async fetchOpportunityRequirementById(id: number) { // Changed function name
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching opportunity requirement with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

  // Create a new opportunity requirement
  async createOpportunityRequirement(payload: Omit<Opportunity, "id">) { // Changed function name
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error("Error creating opportunity requirement:", error); // Changed error message
      throw error;
    }
  },

  // Update an existing opportunity requirement
  async updateOpportunityRequirement(id: number, payload: Partial<Omit<Opportunity, "id">>) { // Changed function name
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error(`Error updating opportunity requirement with ID ${id}:`, error); // Changed error message
      throw error;
    }
  },

  // Delete an opportunity requirement
  async deleteOpportunityRequirement(id: number) { // Changed function name
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting opportunity requirement with ID ${id}:`, error); // Changed error message
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
