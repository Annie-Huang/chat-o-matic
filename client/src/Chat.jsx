import React from 'react';

// Mirror how to do it in https://www.apollographql.com/docs/react/get-started/ from index.js setup;
// 'Connect your client to React' setup.
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const Chat = () => {
  return (
    <div>I'm a chat window</div>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)
