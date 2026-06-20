import { useMutation } from '@apollo/client/react';
import { CreateExpenseDocument, GetExpensesDocument } from '@infrastructure/graphql/__generated__/graphql';
import type { CreateExpenseInput } from '@domain/expense.entity';

export function useCreateExpense() {
  const [mutate, { loading, error }] = useMutation(CreateExpenseDocument, {
    refetchQueries: [{ query: GetExpensesDocument }],
  });

  async function createExpense(input: CreateExpenseInput, createdBy: string) {
    const { data } = await mutate({ variables: { input, createdBy } });
    return data?.createExpense;
  }

  return { createExpense, loading, error };
}
