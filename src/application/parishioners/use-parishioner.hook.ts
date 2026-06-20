import { useQuery } from '@apollo/client/react';
import { GetParishionerDocument } from '@infrastructure/graphql/__generated__/graphql';

export function useParishioner(id: string) {
  const { data, loading, error } = useQuery(GetParishionerDocument, {
    variables: { id },
    skip: !id,
  });
  return {
    parishioner: data?.parishioner ?? null,
    loading,
    error,
  };
}
