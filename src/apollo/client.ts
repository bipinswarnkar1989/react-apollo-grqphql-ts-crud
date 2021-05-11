import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Movie: {
        fields: {
          isEditable: {
            read(isEditable = false) {
              return isEditable;
            },
          },
        },
      },
      Query: {
        fields: {
          movies: {
            // Short for always preferring incoming over existing data.
            merge: false,
          },
        },
      },
    },
  }),
  connectToDevTools: true,
});
