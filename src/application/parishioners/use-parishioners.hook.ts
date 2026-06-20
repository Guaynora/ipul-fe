import { useQuery } from '@apollo/client/react';
import { GetParishionersDocument } from '@infrastructure/graphql/__generated__/graphql';

export function useParishioners() {
  const { data, loading, error } = useQuery(GetParishionersDocument);
  return {
    parishioners: data?.parishioners ?? [],
    loading,
    error,
  };
}
