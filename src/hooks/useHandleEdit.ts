import { useCallback, useState } from 'react';
import { client } from '../apollo/client';

import {
  MovieFragmentDoc,
  Movie,
} from '../graphql/queries/__generated__/movies.generated';
import { useUpdateMovieMutation } from '../graphql/mutations/__generated__/update-movie.generated';

import { useAlertContext } from '../context/alert/useAlertContext';

export const useHandleEdit = () => {
  const [editables, setEditable] = useState<number[]>([]);
  const [updateMovie] = useUpdateMovieMutation();
  const { createAlert } = useAlertContext();

  const handleChange = useCallback(
    (id: number, field: keyof Movie, fieldVal: string) => {
      client.writeFragment({
        id: `Movie:${id}`,
        fragment: MovieFragmentDoc,
        data: {
          isEditable: 'true',
          [field]: fieldVal,
        },
      });
    },
    []
  );

  const handleEditClick = useCallback((id: number) => {
    setEditable((prevEditables) => [...prevEditables, id]);
  }, []);

  const handleCancelEdit = useCallback((id: number) => {
    setEditable((prevEditables) => prevEditables.filter((el) => el !== id));
  }, []);

  const handleUpdate = useCallback(
    async (movie) => {
      try {
        await updateMovie({
          variables: {
            input: { title: movie.title, minutes: Number(movie.minutes) },
            id: movie.id,
          },
          update: (client, { data }) => {
            console.log(data);
            if (data && data.updateMovie) {
              createAlert({
                content: 'Movie Updated Successfully.',
                autoClose: true,
                autoCloseDuration: 9000,
              });
              client.writeFragment({
                id: `Movie:${movie.id}`,
                fragment: MovieFragmentDoc,
                data: movie,
              });
            }
          },
        });
      } catch (error) {
        alert(error.message);
      }
    },
    [updateMovie, createAlert]
  );

  return {
    editables,
    handleChange,
    handleEditClick,
    handleCancelEdit,
    handleUpdate,
  };
};
