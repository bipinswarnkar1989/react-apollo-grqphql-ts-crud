import { ApolloProvider } from '@apollo/client/react';

import { client } from './apollo/client';

import { AlertContextProvider } from './context/alert/AlertContextProvider';

import { Home } from './pages/home';

import { Alert } from './components/alert';

function App() {
  return (
    <ApolloProvider client={client}>
      <AlertContextProvider>
        <Home />
        <Alert />
      </AlertContextProvider>
    </ApolloProvider>
  );
}

export default App;
