import React from 'react';

// Mirror how to do it in https://www.apollographql.com/docs/react/get-started/ from
// 'index.js' setup | 'Connect your client to React' setup | 'Request data' example
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql  } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const GET_MESSAGES = gql`
query {
  messages {
    id
    content
    user
  }
}
`;

const Messages = ({user}) => {
  const { data } = useQuery(GET_MESSAGES);
  if (!data) {
    return null;
  }

  return JSON.stringify(data);
}

// <div>I'm a chat window</div>
const Chat = () => {
  return (
    <div><Messages user='Jack' /></div>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)
