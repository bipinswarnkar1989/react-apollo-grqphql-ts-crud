import { FormEvent, useCallback, useState } from 'react';
import { client } from '../apollo/client';

import {
  MovieInput,
  useCreateMovieMutation,
} from '../graphql/mutations/__generated__/create-movie.generated';
import {
  GetMoviesDocument,
  MovieFragmentDoc,
} from '../graphql/queries/__generated__/movies.generated';

export const useHandleCreate = () => {
  const [newMovie, setNewMovie] = useState<MovieInput>({
    title: '',
    minutes: 0,
  });

  const [hasInputError, setHasInputError] = useState(false);

  const [createMovie] = useCreateMovieMutation();

  const handleNewMovieChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setNewMovie((prevMovie) => {
      return { ...prevMovie, [name]: value };
    });
  }, []);

  const handleCreateMovie = useCallback(async () => {
    if (!newMovie.minutes && !newMovie.title) {
      setHasInputError(true);
      return;
    }
    const { movies } = client.readFragment({
      fragment: MovieFragmentDoc,
    });

    try {
      await createMovie({
        variables: {
          options: {
            title: newMovie.title,
            minutes: Number(newMovie.minutes),
          },
        },
        update: (cache, { data }) => {
          if (data && data.createMovie) {
            const movie = data.createMovie;
            cache.writeQuery({
              query: GetMoviesDocument,
              data: {
                movies: { ...movies, movie },
              },
            });
            setNewMovie({
              title: '',
              minutes: 0,
            });
          }
        },
      });
    } catch (error) {
      alert(error.message);
    }
  }, [createMovie, newMovie]);
  return {
    newMovie,
    hasInputError,
    handleNewMovieChange,
    handleCreateMovie,
  };
};
