import { useCallback } from "react";
import { client } from "../apollo/client";

import { GetMoviesDocument } from "../graphql/queries/__generated__/movies.generated";
import { useDeleteMovieMutation } from "../graphql/mutations/__generated__/delete-movie.generated";
import { Movie } from "../graphql/types";

export const useHandleDelete = () => {
  const [deleteMovie] = useDeleteMovieMutation();
  const handleDeleteClick = useCallback(
    async (id: number) => {
      const { movies } = client.readQuery({
        query: GetMoviesDocument,
      });
      await deleteMovie({
        variables: {
          id: id,
        },
        update: (client, { data }) => {
          console.log(data);
          if (data && data.deleteMovie) {
            client.writeQuery({
              query: GetMoviesDocument,
              data: {
                movies: movies.filter((m: Movie) => m.id !== id),
              },
            });
          }
        },
      });
    },
    [deleteMovie]
  );

  return {
    handleDeleteClick,
  };
};
