/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Launch = {
  __typename?: 'Launch';
  id: Scalars['ID']['output'];
  isBooked: Scalars['Boolean']['output'];
  mission?: Maybe<Mission>;
  rocket?: Maybe<Rocket>;
  site?: Maybe<Scalars['String']['output']>;
};

/**
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type LaunchConnection = {
  __typename?: 'LaunchConnection';
  cursor: Scalars['String']['output'];
  hasMore: Scalars['Boolean']['output'];
  launches: Array<Maybe<Launch>>;
};

export type Mission = {
  __typename?: 'Mission';
  missionPatch?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};


export type MissionMissionPatchArgs = {
  size?: InputMaybe<PatchSize>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookTrips: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
  login?: Maybe<User>;
};


export type MutationBookTripsArgs = {
  launchIds: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationCancelTripArgs = {
  launchId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export enum PatchSize {
  Large = 'LARGE',
  Small = 'SMALL'
}

export type Query = {
  __typename?: 'Query';
  launch?: Maybe<Launch>;
  launches: LaunchConnection;
  me?: Maybe<User>;
  totalTripsBooked?: Maybe<Scalars['Int']['output']>;
};


export type QueryLaunchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLaunchesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type Rocket = {
  __typename?: 'Rocket';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  tripsBooked?: Maybe<Scalars['Int']['output']>;
};

export type TripUpdateResponse = {
  __typename?: 'TripUpdateResponse';
  launches?: Maybe<Array<Maybe<Launch>>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  trips: Array<Maybe<Launch>>;
};

export type GetLaunchesQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLaunchesQuery = { __typename?: 'Query', launches: { __typename?: 'LaunchConnection', hasMore: boolean, cursor: string, launches: Array<{ __typename?: 'Launch', id: string, site?: string | null, mission?: { __typename?: 'Mission', name?: string | null } | null, rocket?: { __typename?: 'Rocket', name?: string | null, type?: string | null } | null } | null> } };


export const GetLaunchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLaunches"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"launches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"launches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rocket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"site"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]} as unknown as DocumentNode<GetLaunchesQuery, GetLaunchesQueryVariables>;