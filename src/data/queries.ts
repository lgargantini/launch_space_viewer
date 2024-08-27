import { ApolloClient, InMemoryCache } from "@apollo/client";
import { LaunchConnection } from "../graphql/graphql";

export const apolloCache = new InMemoryCache(
  {
    typePolicies: {
      Query: {
        fields: {
          launches: {
            read(existing: LaunchConnection | undefined) {
              // A read function should always return undefined if existing is
              // undefined. Returning undefined signals that the field is
              // missing from the cache, which instructs Apollo Client to
              // fetch its value from your GraphQL server.
              return existing ?? undefined;
            },
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            merge(existing: LaunchConnection, incoming: LaunchConnection | undefined) {
              if (!incoming?.launches.length) return existing;
              const newObj = {
                ...existing,
                ...incoming,
              }

              return newObj;
            },
          }
        }
      }
    }
  }
);

export const apolloClient = new ApolloClient({
  uri: 'https://apollo-fullstack-tutorial.herokuapp.com/graphql',
  cache: apolloCache,
  devtools: { enabled: true }
});