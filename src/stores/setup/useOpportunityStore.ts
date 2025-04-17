import axios from "@/plugins/axios";
import { defineStore } from "pinia";
import { unwrapSuccessResponse } from "@/utils/apiResponse";

interface Opportunity {
  id: number;
  companyId: number;
  name: string;
}

interface State {
  opportunities: Opportunity[];
  selectedOpportunity: Opportunity | null;
}

const API_URL = "opportunities";

export const useOpportunityStore = defineStore("opportunity", {
  state: (): State => ({
    opportunities: [],
    selectedOpportunity: null,
  }),
  actions: {
    // Fetch all opportunities
    async fetchOpportunity(payload?: Record<string, any>): Promise<void> {
      try {
        const request = await axios.get(`${API_URL}`, { params: payload });
        const response = unwrapSuccessResponse(request);
        this.opportunities = response.data.records as Opportunity[];
      } catch (error) {
        console.error("Failed to fetch opportunities:", error);
      }
    },

    // Fetch a single opportunity by ID
    async fetchOpportunityById(id: number): Promise<void> {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        this.selectedOpportunity = unwrapSuccessResponse(response).data as Opportunity;
      } catch (error) {
        console.error(`Failed to fetch opportunity with ID ${id}:`, error);
        throw error;
      }
    },

    // Create a new opportunity
    async createOpportunity(payload: Omit<Opportunity, "id">): Promise<void> {
      try {
        const request = await axios.post(`${API_URL}`, payload);
        const response = unwrapSuccessResponse(request);
        this.opportunities.push(response.data.records as Opportunity);
      } catch (error) {
        console.error("Failed to create opportunity:", error);
      }
    },

    // Update an existing opportunity
    async updateOpportunity(id: number, payload: Partial<Omit<Opportunity, "id">>): Promise<void> {
      try {
        const response = await axios.put(`${API_URL}/${id}`, payload);
        const updatedOpportunity = unwrapSuccessResponse(response).data as Opportunity;

        const index = this.opportunities.findIndex((model: Opportunity) => model.id === id);
        if (index !== -1) {
          this.opportunities[index] = updatedOpportunity;
        }

        if (this.selectedOpportunity?.id === id) {
          this.selectedOpportunity = updatedOpportunity;
        }
      } catch (error) {
        console.error(`Failed to update opportunity with ID ${id}:`, error);
        throw error;
      }
    },

    // Delete an opportunity
    async deleteOpportunity(id: number): Promise<void> {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.opportunities = this.opportunities.filter((model: Opportunity) => model.id !== id);

        if (this.selectedOpportunity?.id === id) {
          this.selectedOpportunity = null;
        }
      } catch (error) {
        console.error(`Failed to delete opportunity with ID ${id}:`, error);
        throw error;
      }
    },
  },
});

export default useOpportunityStore;
