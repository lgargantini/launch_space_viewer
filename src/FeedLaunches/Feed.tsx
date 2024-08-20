import { useQuery, QueryResult, ApolloError } from "@apollo/client";
import { Launches } from "./Launches";
import { GET_LAUNCHES } from "../data/queries";
import { useEffect, useState } from "react";
import { ILaunchConnection } from "../data/types";

export const Feed = () => {
  const { loading, data, error, fetchMore }: QueryResult<{ launches: ILaunchConnection }> = useQuery(GET_LAUNCHES, {
    variables: {
      pageSize: 5
    },
  });
  const [errorFetchMore, setErrorFetchMore] = useState<ApolloError | undefined>();

  useEffect(() => {
    const onLoadMoreCallback = (launches: ILaunchConnection) => {
      fetchMore({
        variables: {
          after: String(launches?.cursor),
        },
        updateQuery(previousData, { fetchMoreResult }: { fetchMoreResult: { launches: ILaunchConnection } }) {
          if (!fetchMoreResult) return previousData;
          const incomingLaunches: ILaunchConnection = fetchMoreResult?.launches ?? { cursor: '', hasMore: false, launches: [] };
          // Slicing is necessary because the existing data is
          // immutable, and frozen in development.
          const mergedLaunches = [...previousData.launches.launches];

          for (let i = 0; i < incomingLaunches.launches.length; i++) {
            if (!mergedLaunches.some((launch) => launch.id === incomingLaunches.launches[i].id)) {
              mergedLaunches.push(incomingLaunches.launches[i]);
            }
          }

          return {
            previousData,
            launches: {
              cursor: incomingLaunches.cursor,
              hasMore: incomingLaunches.hasMore,
              launches: incomingLaunches ? mergedLaunches : [],
            }
          };
        },
      }).catch((e) => {
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
        onLoadMoreCallback(data?.launches);
      }
    };

    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [data, fetchMore]);

  const launches: ILaunchConnection | undefined = data?.launches;

  if (error) return <p>Error : {error.message}</p>;
  if (errorFetchMore) return <p>Error fetching more launches: {errorFetchMore.message}</p>;

  if (loading) return 'Loading...';

  return (
    <Launches
      entries={launches?.launches || []}
    />
  );
}