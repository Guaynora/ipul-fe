/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateExpenseInput = {
  amount: string;
  category: string;
  date: string;
  description: string;
  fundSource: FundSource;
};

export type CreateIncomeInput = {
  amount: string;
  date: string;
  description?: string | null | undefined;
  parishionerId?: string | null | undefined;
  type: IncomeType;
};

export type CreateParishionerInput = {
  address?: string | null | undefined;
  baptized: boolean;
  email?: string | null | undefined;
  name: string;
  phone?: string | null | undefined;
};

export type CreateTitheDiscountInput = {
  effectiveFrom: string;
  rules: string;
};

export type DiscountStatus =
  | 'ACTIVE'
  | 'DRAFT'
  | 'RETIRED';

export type FundSource =
  | 'NON_TITHE'
  | 'TITHE';

export type IncomeType =
  | 'OFFERING'
  | 'SALE_OTHER'
  | 'TITHE';

export type ReportFilterInput = {
  from?: string | null | undefined;
  to?: string | null | undefined;
};

export type UpdateParishionerInput = {
  address?: string | null | undefined;
  baptized?: boolean | null | undefined;
  email?: string | null | undefined;
  name?: string | null | undefined;
  phone?: string | null | undefined;
};

export type GetExpensesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExpensesQuery = { expenses: Array<{ id: string, description: string, amount: string, date: unknown, category: string, fundSource: FundSource, createdBy: string }> };

export type CreateExpenseMutationVariables = Exact<{
  input: CreateExpenseInput;
  createdBy: string;
}>;


export type CreateExpenseMutation = { createExpense: { id: string, description: string, amount: string, date: unknown, category: string, fundSource: FundSource, createdBy: string } };

export type GetIncomesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIncomesQuery = { incomes: Array<{ id: string, type: string, amount: string, date: unknown, description: string | null, parishionerId: string | null, createdBy: string }> };

export type CreateIncomeMutationVariables = Exact<{
  input: CreateIncomeInput;
  createdBy: string;
}>;


export type CreateIncomeMutation = { createIncome: { id: string, type: string, amount: string, date: unknown, description: string | null, parishionerId: string | null, createdBy: string } };

export type GetParishionersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetParishionersQuery = { parishioners: Array<{ id: string, name: string, email: string | null, phone: string | null, address: string | null, baptized: boolean, createdAt: unknown, updatedAt: unknown }> };

export type GetParishionerQueryVariables = Exact<{
  id: string | number;
}>;


export type GetParishionerQuery = { parishioner: { id: string, name: string, email: string | null, phone: string | null, address: string | null, baptized: boolean, createdAt: unknown, updatedAt: unknown } | null };

export type CreateParishionerMutationVariables = Exact<{
  input: CreateParishionerInput;
}>;


export type CreateParishionerMutation = { createParishioner: { id: string, name: string, email: string | null, phone: string | null, address: string | null, baptized: boolean } };

export type UpdateParishionerMutationVariables = Exact<{
  id: string | number;
  input: UpdateParishionerInput;
}>;


export type UpdateParishionerMutation = { updateParishioner: { id: string, name: string, email: string | null, phone: string | null, address: string | null, baptized: boolean } };

export type DeleteParishionerMutationVariables = Exact<{
  id: string | number;
}>;


export type DeleteParishionerMutation = { deleteParishioner: boolean };

export type GetIncomeReportQueryVariables = Exact<{
  filter?: ReportFilterInput | null | undefined;
}>;


export type GetIncomeReportQuery = { incomeReport: { grandTotal: string, byType: Array<{ type: IncomeType, total: string }> } };

export type GetExpenseReportQueryVariables = Exact<{
  filter?: ReportFilterInput | null | undefined;
}>;


export type GetExpenseReportQuery = { expenseReport: { grandTotal: string, byFund: Array<{ fundSource: FundSource, total: string }>, byCategory: Array<{ category: string, total: string }> } };

export type GetBalanceReportQueryVariables = Exact<{
  filter?: ReportFilterInput | null | undefined;
}>;


export type GetBalanceReportQuery = { balanceReport: { totalIncome: string, totalExpense: string, netBalance: string, byFund: Array<{ fund: FundSource, totalIncome: string, totalExpense: string, net: string }> } };

export type GetTitheDiscountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTitheDiscountsQuery = { titheDiscounts: Array<{ id: string, version: number, status: DiscountStatus, effectiveFrom: unknown, rules: string, createdBy: string, createdAt: unknown, activatedAt: unknown }> };

export type GetActiveTitheDiscountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveTitheDiscountQuery = { activeTitheDiscount: { id: string, version: number, status: DiscountStatus, effectiveFrom: unknown, rules: string, createdBy: string, createdAt: unknown, activatedAt: unknown } | null };

export type CreateTitheDiscountMutationVariables = Exact<{
  input: CreateTitheDiscountInput;
  createdBy: string;
}>;


export type CreateTitheDiscountMutation = { createTitheDiscount: { id: string, version: number, status: DiscountStatus, effectiveFrom: unknown, rules: string, createdBy: string, createdAt: unknown } };

export type ActivateTitheDiscountMutationVariables = Exact<{
  id: string;
}>;


export type ActivateTitheDiscountMutation = { activateTitheDiscount: { id: string, version: number, status: DiscountStatus, activatedAt: unknown } };


export const GetExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fundSource"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}}]}}]}}]} as unknown as DocumentNode<GetExpensesQuery, GetExpensesQueryVariables>;
export const CreateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExpenseInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createdBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"createdBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createdBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fundSource"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}}]}}]}}]} as unknown as DocumentNode<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const GetIncomesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIncomes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"incomes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parishionerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}}]}}]}}]} as unknown as DocumentNode<GetIncomesQuery, GetIncomesQueryVariables>;
export const CreateIncomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateIncome"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateIncomeInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createdBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createIncome"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"createdBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createdBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parishionerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}}]}}]}}]} as unknown as DocumentNode<CreateIncomeMutation, CreateIncomeMutationVariables>;
export const GetParishionersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetParishioners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parishioners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"baptized"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetParishionersQuery, GetParishionersQueryVariables>;
export const GetParishionerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetParishioner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parishioner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"baptized"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetParishionerQuery, GetParishionerQueryVariables>;
export const CreateParishionerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateParishioner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateParishionerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createParishioner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"baptized"}}]}}]}}]} as unknown as DocumentNode<CreateParishionerMutation, CreateParishionerMutationVariables>;
export const UpdateParishionerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateParishioner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateParishionerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateParishioner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"baptized"}}]}}]}}]} as unknown as DocumentNode<UpdateParishionerMutation, UpdateParishionerMutationVariables>;
export const DeleteParishionerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteParishioner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteParishioner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteParishionerMutation, DeleteParishionerMutationVariables>;
export const GetIncomeReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIncomeReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"incomeReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"byType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"grandTotal"}}]}}]}}]} as unknown as DocumentNode<GetIncomeReportQuery, GetIncomeReportQueryVariables>;
export const GetExpenseReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpenseReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"byFund"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fundSource"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"byCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"grandTotal"}}]}}]}}]} as unknown as DocumentNode<GetExpenseReportQuery, GetExpenseReportQueryVariables>;
export const GetBalanceReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBalanceReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balanceReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"byFund"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fund"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpense"}},{"kind":"Field","name":{"kind":"Name","value":"net"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpense"}},{"kind":"Field","name":{"kind":"Name","value":"netBalance"}}]}}]}}]} as unknown as DocumentNode<GetBalanceReportQuery, GetBalanceReportQueryVariables>;
export const GetTitheDiscountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTitheDiscounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"titheDiscounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveFrom"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"activatedAt"}}]}}]}}]} as unknown as DocumentNode<GetTitheDiscountsQuery, GetTitheDiscountsQueryVariables>;
export const GetActiveTitheDiscountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActiveTitheDiscount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeTitheDiscount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveFrom"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"activatedAt"}}]}}]}}]} as unknown as DocumentNode<GetActiveTitheDiscountQuery, GetActiveTitheDiscountQueryVariables>;
export const CreateTitheDiscountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTitheDiscount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTitheDiscountInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createdBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTitheDiscount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"createdBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createdBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveFrom"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateTitheDiscountMutation, CreateTitheDiscountMutationVariables>;
export const ActivateTitheDiscountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateTitheDiscount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateTitheDiscount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"activatedAt"}}]}}]}}]} as unknown as DocumentNode<ActivateTitheDiscountMutation, ActivateTitheDiscountMutationVariables>;