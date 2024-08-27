import { useQuery, ApolloError } from "@apollo/client";
import { Launches } from "./Launches";
import { useEffect, useState } from "react";
import { gql } from "../graphql/gql";
import { GetLaunchesQuery, LaunchConnection } from "../graphql/graphql";
import { ErrorComponent } from "./Error";

export const GET_LAUNCHES = gql(/* GraphQL */`
  query GetLaunches($pageSize: Int, $after: String){
    launches(pageSize: $pageSize, after: $after) {
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
`);
export const Feed = () => {
  const { loading, data, error: errorQuery, fetchMore } = useQuery(
    GET_LAUNCHES, { variables: { pageSize: 5 } }
  );
  const [errorFetchMore, setErrorFetchMore] = useState<ApolloError | undefined>();

  useEffect(() => {
    const onLoadMoreCallback = (previousData: GetLaunchesQuery) => {
      fetchMore({
        variables: {
          after: String(previousData.launches.cursor),
        },
        updateQuery(previousData, options) {
          if (!options.fetchMoreResult.launches.launches.length) {
            return {
              launches: previousData.launches
            };
          }
          const incomingLaunches = options.fetchMoreResult.launches as LaunchConnection;
          // Slicing is necessary because the existing data is
          // immutable, and frozen in development.
          const mergedLaunches = previousData.launches.launches.slice(0);

          for (let i = 0; i < incomingLaunches.launches.length; i++) {
            if (!mergedLaunches.some((launch) => launch?.id === incomingLaunches.launches[i]?.id)) {
              mergedLaunches.push(incomingLaunches.launches[i]);
            }
          }
          const newLaunches = {
            launches: {
              cursor: incomingLaunches.cursor,
              hasMore: incomingLaunches.hasMore,
              launches: mergedLaunches,
            }
          };

          return newLaunches;
        },
      }).catch((e: unknown) => {
        setErrorFetchMore(e as ApolloError);
      });
    };
    const handleInfiniteScroll = () => {
      const {
        scrollTop, //https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
        clientHeight, //https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
        scrollHeight //https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
      } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && data?.launches.hasMore) {
        onLoadMoreCallback(data);
      }
    };

    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [data, fetchMore]);

  const launches = data?.launches as LaunchConnection;

  if (errorQuery) return <ErrorComponent error={errorQuery} />;
  if (loading) return 'Loading...';

  return (
    <Launches
      launches={launches}
      error={errorFetchMore}
    />
  );
}