import { useQuery } from '@apollo/client/react';
import { GetExpensesDocument } from '@infrastructure/graphql/__generated__/graphql';

export function useExpenses() {
  const { data, loading, error } = useQuery(GetExpensesDocument);
  return {
    expenses: data?.expenses ?? [],
    loading,
    error,
  };
}
