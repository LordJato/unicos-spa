import axios from "@/plugins/axios";
import { defineStore } from "pinia";
import { unwrapSuccessResponse } from "@/utils/apiResponse";

interface Company {
  id: number;
  companyId: number;
  name: string;
}

interface State {
    companies: Company[];
  selectedCompany: Company | null;
}

export const useCompanyStore = defineStore("company", {
  state: (): State => ({
    companies: [],
    selectedCompany: null,
  }),
  actions: {
    // Fetch all Company
    async fetchCompany(payload?: Record<string, any>): Promise<void> {
      try {
        const request = await axios.get("companies", { params: payload });
        const response = unwrapSuccessResponse(request);
        this.companies = response.data.records as Company[];
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    },
    // Fetch a single Company by ID
    async fetchCompanyById(id: number): Promise<void> {
      try {
        const response = await axios.get(`companies/${id}`);
        this.selectedCompany = unwrapSuccessResponse(response)
          .data as Company;
      } catch (error) {
        console.error(`Failed to fetch company with ID ${id}:`, error);
        throw error;
      }
    },
    // Create a new Company
    async createCompany(payload: Omit<Company, "id">): Promise<void> {
      try {
        const request = await axios.post("companies", payload);
        const response = unwrapSuccessResponse(request);
        this.companies.push(response.data.records as Company);
      } catch (error) {
        console.error("Failed to create company:", error);
      }
    },

    //Update an existing Company
    async updateCompany(
      id: number,
      payload: Partial<Omit<Company, "id">>
    ): Promise<void> {
      try {
        const response = await axios.put(`companies/${id}`, payload);
        const updatedCompany = unwrapSuccessResponse(response)
          .data as Company;

        const index = this.companies.findIndex((model : Company) => model.id === id);
        if (index !== -1) {
          this.companies[index] = updatedCompany;
        }

        if (this.selectedCompany?.id === id) {
          this.selectedCompany = updatedCompany;
        }
      } catch (error) {
        console.error(`Failed to update company with ID ${id}:`, error);
        throw error;
      }
    },

    //Delete Company
    async deleteCompany(id: number): Promise<void> {
      try {
        await axios.delete(`companies/${id}`);

        this.companies = this.companies.filter((dept : Company) => dept.id !== id);

        if (this.selectedCompany?.id === id) {
          this.selectedCompany = null;
        }
      } catch (error) {
        console.error(`Failed to delete company with ID ${id}:`, error);
        throw error;
      }
    },
  },
});

export default useCompanyStore;
