import axios from "@/plugins/axios";
import { unwrapSuccessResponse } from "@/utils/apiResponse";
import type { Account } from "@/types";

const API_URL = "accounts";

export default {

  // Fetch all account
  async fetchAccounts(payload?: Record<string, any>) {
    try {
      const response = await axios.get(API_URL, { params: payload });
      return unwrapSuccessResponse(response).data.records;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  },

  // Fetch a single account by ID
  async fetchAccountById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return unwrapSuccessResponse(response).data;
    } catch (error) {
      console.error(`Error fetching account with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new account
  async createAccount(payload: Omit<Account, "id">) {
    try {
      const response = await axios.post(API_URL, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  },

  // Update an existing account
  async updateAccount(id: number, payload: Partial<Omit<Account, "id">>) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return unwrapSuccessResponse(response);
    } catch (error) {
      console.error(`Error updating account with ID ${id}:`, error);
      throw error; 
    }
  },

    // Fetch all account type
    async fetchAccountTypes() {
      try {
        const response = await axios.get('account-types');
        return unwrapSuccessResponse(response).data;
      } catch (error) {
        console.error("Error fetching accounts:", error);
        throw error;
      }
    },
  
};
