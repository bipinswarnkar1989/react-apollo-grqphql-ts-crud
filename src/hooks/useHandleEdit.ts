import { useCallback, useState } from "react";
import { client } from "../apollo/client";

import {
  MovieFragmentDoc,
  Movie,
} from "../graphql/queries/__generated__/movies.generated";
import { useUpdateMovieMutation } from "../graphql/mutations/__generated__/update-movie.generated";

export const useHandleEdit = () => {
  const [editables, setEditable] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");
  const [updateMovie] = useUpdateMovieMutation();

  const handleChange = useCallback(
    (id: number, field: keyof Movie, fieldVal: string) => {
      client.writeFragment({
        id: `Movie:${id}`,
        fragment: MovieFragmentDoc,
        data: {
          isEditable: "true",
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
      await updateMovie({
        variables: {
          input: { title: movie.title, minutes: Number(movie.minutes) },
          id: movie.id,
        },
        update: (client, { data }) => {
          console.log(data);
          if (data && data.updateMovie) {
            setMessage("Movie Updated Successfully.");
            client.writeFragment({
              id: `Movie:${movie.id}`,
              fragment: MovieFragmentDoc,
              data: movie,
            });
            setTimeout(() => {
              setMessage("");
            }, 5000);
          }
        },
      });
    },
    [updateMovie]
  );

  return {
    editables,
    message,
    handleChange,
    handleEditClick,
    handleCancelEdit,
    handleUpdate,
  };
};
