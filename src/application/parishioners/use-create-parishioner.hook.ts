import { useMutation } from '@apollo/client/react';
import { CreateParishionerDocument, GetParishionersDocument } from '@infrastructure/graphql/__generated__/graphql';
import type { CreateParishionerInput } from '@domain/parishioner.entity';

export function useCreateParishioner() {
  const [mutate, { loading, error }] = useMutation(CreateParishionerDocument, {
    refetchQueries: [{ query: GetParishionersDocument }],
  });

  async function createParishioner(input: CreateParishionerInput) {
    const { data } = await mutate({ variables: { input } });
    return data?.createParishioner;
  }

  return { createParishioner, loading, error };
}
