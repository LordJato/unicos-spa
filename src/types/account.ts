export interface Account {
  id: number;
  accountTypeId: number;
  name: string;
  createdAt?: string; // Optional
  updatedAt?: string; // Optional
  isActive: boolean;
}
