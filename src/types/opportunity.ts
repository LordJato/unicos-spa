export interface Opportunity {
  id?: number;
  company_id: number;
  opportunity_type_id: number;
  opportunity_status_id: number;
  designation_id: number;
  career_level_id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  schedule: string;
  years_of_experience: number;
  vacancy: number;
  created_at?: string;
  updated_at?: string;
};