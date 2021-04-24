import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['Int'];
  title: Scalars['String'];
  minutes: Scalars['Int'];
};

export type MovieInput = {
  title: Scalars['String'];
  minutes: Scalars['Int'];
};

export type MovieUpdateInput = {
  title: Maybe<Scalars['String']>;
  minutes: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMovie: Movie;
  updateMovie: Scalars['Boolean'];
  deleteMovie: Scalars['Boolean'];
};


export type MutationCreateMovieArgs = {
  options: MovieInput;
};


export type MutationUpdateMovieArgs = {
  input: MovieUpdateInput;
  id: Scalars['Int'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  movies: Array<Movie>;
};

export type CreateMoviesMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateMoviesMutation = (
  { __typename?: 'Mutation' }
  & { createMovie: (
    { __typename?: 'Movie' }
    & Pick<Types.Movie, 'id' | 'title' | 'minutes'>
  ) }
);


export const CreateMoviesDocument = gql`
    mutation createMovies {
  createMovie(options: {title: "Hallow Man", minutes: 100}) {
    id
    title
    minutes
  }
}
    `;
export type CreateMoviesMutationFn = Apollo.MutationFunction<CreateMoviesMutation, CreateMoviesMutationVariables>;

/**
 * __useCreateMoviesMutation__
 *
 * To run a mutation, you first call `useCreateMoviesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMoviesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMoviesMutation, { data, loading, error }] = useCreateMoviesMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateMoviesMutation(baseOptions?: Apollo.MutationHookOptions<CreateMoviesMutation, CreateMoviesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMoviesMutation, CreateMoviesMutationVariables>(CreateMoviesDocument, options);
      }
export type CreateMoviesMutationHookResult = ReturnType<typeof useCreateMoviesMutation>;
export type CreateMoviesMutationResult = Apollo.MutationResult<CreateMoviesMutation>;
export type CreateMoviesMutationOptions = Apollo.BaseMutationOptions<CreateMoviesMutation, CreateMoviesMutationVariables>;