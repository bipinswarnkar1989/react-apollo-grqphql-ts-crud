import { ApolloProvider } from "@apollo/client/react";

import { client } from "./apollo/client";

import { Home } from "./pages/home";

function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
