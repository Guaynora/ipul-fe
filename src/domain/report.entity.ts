import type { FundSource } from './expense.entity';
import type { IncomeType } from './income.entity';

export interface ReportFilter {
  from?: string;
  to?: string;
}

export interface IncomeByType {
  type: IncomeType;
  total: string;
}

export interface IncomeReport {
  byType: IncomeByType[];
  grandTotal: string;
}

export interface ExpenseByFund {
  fundSource: FundSource;
  total: string;
}

export interface ExpenseByCategory {
  category: string;
  total: string;
}

export interface ExpenseReport {
  byFund: ExpenseByFund[];
  byCategory: ExpenseByCategory[];
  grandTotal: string;
}

export interface FundBalance {
  fund: FundSource;
  totalIncome: string;
  totalExpense: string;
  net: string;
}

export interface BalanceReport {
  byFund: FundBalance[];
  totalIncome: string;
  totalExpense: string;
  netBalance: string;
}
