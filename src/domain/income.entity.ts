export type IncomeType = 'OFFERING' | 'TITHE' | 'SALE_OTHER';

export interface Income {
  id: string;
  type: IncomeType;
  amount: string;
  date: string;
  description?: string;
  parishionerId?: string;
  createdBy: string;
}

export interface CreateIncomeInput {
  type: IncomeType;
  amount: string;
  date: string;
  description?: string;
  parishionerId?: string;
}
