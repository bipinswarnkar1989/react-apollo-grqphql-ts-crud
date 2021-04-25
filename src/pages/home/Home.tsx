import { FC } from "react";

import { useGetMoviesQuery } from "../../graphql/queries/__generated__/movies.generated";

import { useHandleEdit } from "../../hooks/useHandleEdit";

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
          </tr>
        </thead>
        <tbody>
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button onClick={() => handleUpdate(m)}>Save</button>
                    <button onClick={() => handleCancelEdit(m.id)}>
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.minutes}</td>
                <td>
                  <button onClick={() => handleEditClick(m.id)}>Edit</button>
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
