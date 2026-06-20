import { useQuery } from '@apollo/client/react';
import { GetActiveTitheDiscountDocument } from '@infrastructure/graphql/__generated__/graphql';

export function useActiveTitheDiscount() {
  const { data, loading, error } = useQuery(GetActiveTitheDiscountDocument);
  return {
    activeTitheDiscount: data?.activeTitheDiscount ?? null,
    loading,
    error,
  };
}
