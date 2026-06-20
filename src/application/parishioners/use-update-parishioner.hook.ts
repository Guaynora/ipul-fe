import { useMutation } from '@apollo/client/react';
import { UpdateParishionerDocument, GetParishionersDocument } from '@infrastructure/graphql/__generated__/graphql';
import type { UpdateParishionerInput } from '@domain/parishioner.entity';

export function useUpdateParishioner() {
  const [mutate, { loading, error }] = useMutation(UpdateParishionerDocument, {
    refetchQueries: [{ query: GetParishionersDocument }],
  });

  async function updateParishioner(id: string, input: UpdateParishionerInput) {
    const { data } = await mutate({ variables: { id, input } });
    return data?.updateParishioner;
  }

  return { updateParishioner, loading, error };
}
