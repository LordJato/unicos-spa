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

const API_URL = "companies";

export const useCompanyStore = defineStore("company", {
  state: (): State => ({
    companies: [],
    selectedCompany: null,
  }),
  actions: {
    
    async fetchCompany(payload?: Record<string, any>): Promise<void> {
      try {
        const request = await axios.get(`${API_URL}`, { params: payload });
        const response = unwrapSuccessResponse(request);
        this.companies = response.data.records as Company[];
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    },
    
    async fetchCompanyById(id: number): Promise<void> {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        this.selectedCompany = unwrapSuccessResponse(response)
          .data as Company;
      } catch (error) {
        console.error(`Failed to fetch company with ID ${id}:`, error);
        throw error;
      }
    },
    
    async createCompany(payload: Omit<Company, "id">): Promise<void> {
      try {
        const request = await axios.post(`${API_URL}`, payload);
        const response = unwrapSuccessResponse(request);
        this.companies.push(response.data.records as Company);
      } catch (error) {
        console.error("Failed to create company:", error);
      }
    },
    
    async updateCompany(id: number, payload: Partial<Omit<Company, "id">>): Promise<void> {
      try {
        const response = await axios.put(`${API_URL}/${id}`, payload);
        const updatedCompany = unwrapSuccessResponse(response)
          .data as Company;

        const index = this.companies.findIndex((model: Company) => model.id === id);
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
    
    async deleteCompany(id: number): Promise<void> {
      try {
        await axios.delete(`${API_URL}/${id}`);

        this.companies = this.companies.filter((model: Company) => model.id !== id);

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
