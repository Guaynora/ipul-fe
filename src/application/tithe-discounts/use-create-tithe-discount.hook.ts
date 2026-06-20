import { useMutation } from '@apollo/client/react';
import {
  CreateTitheDiscountDocument,
  GetTitheDiscountsDocument,
  GetActiveTitheDiscountDocument,
} from '@infrastructure/graphql/__generated__/graphql';
import type { CreateTitheDiscountInput } from '@domain/tithe-discount.entity';

export function useCreateTitheDiscount() {
  const [mutate, { loading, error }] = useMutation(CreateTitheDiscountDocument, {
    refetchQueries: [
      { query: GetTitheDiscountsDocument },
      { query: GetActiveTitheDiscountDocument },
    ],
  });

  async function createTitheDiscount(input: CreateTitheDiscountInput, createdBy: string) {
    const { data } = await mutate({ variables: { input, createdBy } });
    return data?.createTitheDiscount;
  }

  return { createTitheDiscount, loading, error };
}
