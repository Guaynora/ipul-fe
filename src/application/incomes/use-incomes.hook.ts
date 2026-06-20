import { useQuery } from '@apollo/client/react';
import { GetIncomesDocument } from '@infrastructure/graphql/__generated__/graphql';

export function useIncomes() {
  const { data, loading, error } = useQuery(GetIncomesDocument);
  return {
    incomes: data?.incomes ?? [],
    loading,
    error,
  };
}
