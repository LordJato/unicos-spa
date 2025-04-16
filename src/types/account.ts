export interface Account {
  id: number;
  accountTypeId: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
}
