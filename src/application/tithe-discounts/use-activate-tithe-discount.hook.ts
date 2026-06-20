import { useMutation } from '@apollo/client/react';
import {
  ActivateTitheDiscountDocument,
  GetTitheDiscountsDocument,
  GetActiveTitheDiscountDocument,
} from '@infrastructure/graphql/__generated__/graphql';

export function useActivateTitheDiscount() {
  const [mutate, { loading, error }] = useMutation(ActivateTitheDiscountDocument, {
    refetchQueries: [
      { query: GetTitheDiscountsDocument },
      { query: GetActiveTitheDiscountDocument },
    ],
  });

  async function activateTitheDiscount(id: string) {
    const { data } = await mutate({ variables: { id } });
    return data?.activateTitheDiscount;
  }

  return { activateTitheDiscount, loading, error };
}
