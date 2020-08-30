import React from 'react';

// Mirror how to do it in https://www.apollographql.com/docs/react/get-started/ from
// 'index.js' setup | 'Connect your client to React' setup | 'Request data' example
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql  } from '@apollo/client';

import {Container} from 'shards-react';

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

  // return JSON.stringify(data);
  return (
    <>
      {data.messages.map(({id, user: messageUser, content}) => (
        <div
          style={{
            display: 'flex',
            justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
            paddingBottom: '1em',
          }}
        >
          <div
            style={{
              background: user === messageUser ? '#58bf56' : '#e5e6ea',
              color: user === messageUser ? 'white' : 'black',
              padding: '1em',
              borderRadius: '1em',
              maxWidth: '60%'
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  );
}

// <div>I'm a chat window</div>
const Chat = () => {
  return (
    <Container>
      <Messages user='Jack' />
    </Container>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)
