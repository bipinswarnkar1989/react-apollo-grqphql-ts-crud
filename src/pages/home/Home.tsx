import { FC } from "react";

import { useGetMoviesQuery } from "../../graphql/queries/__generated__/movies.generated";

import { useHandleEdit } from "../../hooks/useHandleEdit";
import { useHandleDelete } from "../../hooks/useHandleDelete";
import { useHandleCreate } from "../../hooks/useHandleCreate";

export const Home: FC = () => {
  const { data, loading, error } = useGetMoviesQuery();

  const {
    handleChange,
    handleEditClick,
    handleCancelEdit,
    handleUpdate,
    editables,
    message,
  } = useHandleEdit();

  const { handleDeleteClick } = useHandleDelete();

  const {
    newMovie,
    hasInputError,
    handleNewMovieChange,
    handleCreateMovie,
  } = useHandleCreate();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Movies</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Minutes</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={newMovie.title}
                onChange={handleNewMovieChange}
                name="title"
              />
              {hasInputError && !newMovie.title && (
                <span style={{ display: "block", color: "red" }}>required</span>
              )}
            </td>
            <td>
              <input
                type="number"
                value={newMovie.minutes}
                onChange={handleNewMovieChange}
                name="minutes"
              />
              {hasInputError && !newMovie.minutes && (
                <span style={{ display: "block", color: "red" }}>required</span>
              )}
            </td>
            <td></td>
            <td>
              <button onClick={handleCreateMovie}>Create Movie</button>
            </td>
          </tr>
          {data?.movies?.map((m) =>
            editables.indexOf(m.id) !== -1 ? (
              <tr key={m.id}>
                <td>
                  <input
                    type="text"
                    value={m.title}
                    onChange={(e) =>
                      handleChange(m.id, "title", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={m.minutes}
                    onChange={(e) =>
                      handleChange(m.id, "minutes", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdate(m)}>Save</button>
                </td>
                <td>
                  <button onClick={() => handleCancelEdit(m.id)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.minutes}</td>
                <td>
                  <button onClick={() => handleEditClick(m.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(m.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div style={{ margin: "20px" }}>{message}</div>
    </div>
  );
};
