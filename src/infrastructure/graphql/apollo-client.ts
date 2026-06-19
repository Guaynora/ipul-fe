import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { ApolloLink } from '@apollo/client/link';
import { setContext } from '@apollo/client/link/context';
import { ErrorLink, onError } from '@apollo/client/link/error';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { Observable, type Subscriber } from 'rxjs';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token =
    typeof document !== 'undefined'
      ? document.cookie
          .split('; ')
          .find((row) => row.startsWith('access_token='))
          ?.split('=')[1]
      : undefined;

  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  };
});

const errorLink: ErrorLink = onError(({ error, operation, forward }) => {
  const isUnauth =
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((e) => e.extensions?.code === 'UNAUTHENTICATED');

  if (isUnauth) {
    return new Observable(
      (observer: Subscriber<ApolloLink.Result>) => {
        fetch('/api/auth/refresh', { method: 'POST' })
          .then((res) => {
            if (!res.ok) throw new Error('Refresh failed');
            forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            observer.error(new Error('Session expired'));
          });
      },
    );
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
