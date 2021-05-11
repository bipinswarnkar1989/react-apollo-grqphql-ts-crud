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
  isEditable: Scalars['Boolean'];
  minutes: Scalars['Int'];
  title: Scalars['String'];
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

export type UpdateMovieMutationVariables = Types.Exact<{
  input: Types.MovieUpdateInput;
  id: Types.Scalars['Int'];
}>;


export type UpdateMovieMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'updateMovie'>
);


export const UpdateMovieDocument = gql`
    mutation updateMovie($input: MovieUpdateInput!, $id: Int!) {
  updateMovie(input: $input, id: $id)
}
    `;
export type UpdateMovieMutationFn = Apollo.MutationFunction<UpdateMovieMutation, UpdateMovieMutationVariables>;

/**
 * __useUpdateMovieMutation__
 *
 * To run a mutation, you first call `useUpdateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMovieMutation, { data, loading, error }] = useUpdateMovieMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateMovieMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMovieMutation, UpdateMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMovieMutation, UpdateMovieMutationVariables>(UpdateMovieDocument, options);
      }
export type UpdateMovieMutationHookResult = ReturnType<typeof useUpdateMovieMutation>;
export type UpdateMovieMutationResult = Apollo.MutationResult<UpdateMovieMutation>;
export type UpdateMovieMutationOptions = Apollo.BaseMutationOptions<UpdateMovieMutation, UpdateMovieMutationVariables>;