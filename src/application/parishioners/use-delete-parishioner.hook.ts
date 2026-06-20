import { useMutation } from '@apollo/client/react';
import { DeleteParishionerDocument, GetParishionersDocument } from '@infrastructure/graphql/__generated__/graphql';

export function useDeleteParishioner() {
  const [mutate, { loading, error }] = useMutation(DeleteParishionerDocument, {
    refetchQueries: [{ query: GetParishionersDocument }],
  });

  async function deleteParishioner(id: string) {
    await mutate({ variables: { id } });
  }

  return { deleteParishioner, loading, error };
}
