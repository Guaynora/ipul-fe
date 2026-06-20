import { useQuery } from '@apollo/client/react';
import { GetTitheDiscountsDocument } from '@infrastructure/graphql/__generated__/graphql';

export function useTitheDiscounts() {
  const { data, loading, error } = useQuery(GetTitheDiscountsDocument);
  return {
    titheDiscounts: data?.titheDiscounts ?? [],
    loading,
    error,
  };
}
