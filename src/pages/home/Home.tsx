import { FC } from "react";

import { useGetMoviesQuery } from "../../graphql/queries/__generated__/movies.generated";

export const Home: FC = () => {
  const { data, loading, error } = useGetMoviesQuery();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <h2>Movies</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Minutes</th>
          </tr>
        </thead>
        <tbody>
          {data?.movies?.map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.minutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
