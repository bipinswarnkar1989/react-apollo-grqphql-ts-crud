import { FC } from 'react';

import { useGetMoviesQuery } from '../../graphql/queries/__generated__/movies.generated';

import { useHandleEdit } from '../../hooks/useHandleEdit';
import { useHandleDelete } from '../../hooks/useHandleDelete';
import { useHandleCreate } from '../../hooks/useHandleCreate';

export const Home: FC = () => {
  const { data, loading, error } = useGetMoviesQuery();

  const {
    handleChange,
    handleEditClick,
    handleCancelEdit,
    handleUpdate,
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
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
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
                type='text'
                value={newMovie.title}
                onChange={handleNewMovieChange}
                name='title'
                placeholder='Enter movie title'
              />
              {hasInputError && !newMovie.title && (
                <span style={{ display: 'block', color: 'red' }}>required</span>
              )}
            </td>
            <td>
              <input
                type='number'
                value={newMovie.minutes}
                onChange={handleNewMovieChange}
                name='minutes'
              />
              {hasInputError && !newMovie.minutes && (
                <span style={{ display: 'block', color: 'red' }}>required</span>
              )}
            </td>

            <td colSpan={2}>
              <button onClick={handleCreateMovie}>Create Movie</button>
            </td>
          </tr>
          {data?.movies?.map((m) => (
            <tr key={m.id}>
              <td>
                {m.isEditable ? (
                  <input
                    type='text'
                    value={m.title}
                    onChange={(e) =>
                      handleChange(m.id, 'title', e.target.value)
                    }
                  />
                ) : (
                  m.title
                )}
              </td>
              <td>
                {m.isEditable ? (
                  <input
                    type='text'
                    value={m.minutes}
                    onChange={(e) =>
                      handleChange(m.id, 'minutes', e.target.value)
                    }
                  />
                ) : (
                  m.minutes
                )}
              </td>
              <td style={{ textAlign: 'center' }}>
                {!m.isEditable ? (
                  <button onClick={() => handleEditClick(m.id)}>Edit</button>
                ) : (
                  <button onClick={() => handleUpdate(m)}>Save</button>
                )}
              </td>
              <td>
                {!m.isEditable ? (
                  <button onClick={() => handleDeleteClick(m.id)}>
                    Delete
                  </button>
                ) : (
                  <button onClick={() => handleCancelEdit(m.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
