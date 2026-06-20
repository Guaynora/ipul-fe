import { useMutation } from '@apollo/client/react';
import { CreateIncomeDocument, GetIncomesDocument } from '@infrastructure/graphql/__generated__/graphql';
import type { CreateIncomeInput } from '@domain/income.entity';

export function useCreateIncome() {
  const [mutate, { loading, error }] = useMutation(CreateIncomeDocument, {
    refetchQueries: [{ query: GetIncomesDocument }],
  });

  async function createIncome(input: CreateIncomeInput, createdBy: string) {
    const { data } = await mutate({ variables: { input, createdBy } });
    return data?.createIncome;
  }

  return { createIncome, loading, error };
}
