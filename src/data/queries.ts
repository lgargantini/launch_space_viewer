import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { ILaunchRef } from "./types";

export const apolloCache = new InMemoryCache(
  {
    typePolicies: {
      Query: {
        fields: {
          launches: {
            read(existing: ILaunchRef[] | undefined) {
              // A read function should always return undefined if existing is
              // undefined. Returning undefined signals that the field is
              // missing from the cache, which instructs Apollo Client to
              // fetch its value from your GraphQL server.
              return existing ?? undefined;
            },
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
          }
        }
      }
    }
  }
);

export const apolloClient = new ApolloClient({
  uri: 'https://apollo-fullstack-tutorial.herokuapp.com/graphql',
  cache: apolloCache,
});

export const GET_LAUNCHES = gql`
 query GetLaunches($pageSize: Int, $after: String) {
  launches (pageSize: $pageSize, after: $after) {
    launches {
      id,
      mission {
        name
      }
      rocket {
        name
        type
      }
      site
    }
    hasMore
    cursor
  }
}
`;