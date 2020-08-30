import React from 'react';

// Mirror how to do it in https://www.apollographql.com/docs/react/get-started/ from
// 'index.js' setup | 'Connect your client to React' setup | 'Request data' example
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation, gql } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import {Container, Row, Col, FormInput, Button} from 'shards-react';

// https://www.apollographql.com/docs/react/data/subscriptions/   <<< Initialize a WebSocketLink
const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link,
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

const POST_MESSAGES = gql`
mutation ($user: String!, $content: String!) {
  postMessage(user: $user, content: $content)
}
`;

const Messages = ({user}) => {
  // https://www.apollographql.com/docs/react/data/queries/   << polling part
  const { data } = useQuery(GET_MESSAGES, {
    pollInterval: 500,
  });
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
          {user !== messageUser && (
            <div
              style={{
                height: 50,
                width: 50,
                marginRight: '0.5em',
                border: '2px solid #e5e6ea',
                borderRadius: 25,
                textAlign: 'center',
                fontSize: '18pt',
                paddingTop: 5,
              }}
            >
              {messageUser.slice(0,2).toUpperCase()}
            </div>
          )}
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
  const [state, setState] = React.useState({
    user: 'Jack',
    content: '',
  })
  const [postMessage] = useMutation(POST_MESSAGES);

  const onSend = () => {
    if (state.content.length > 0) {
      // https://www.apollographql.com/docs/react/data/mutations/
      postMessage({
        variables: state
      })
    }
    setState({
      ...state,
      content: '',
    })
  }

  return (
    <Container>
      {/*<Messages user='Jack' />*/}
      {/*<Messages user='Mary' />*/}
      <Messages user={state.user} />
      <Row>
        <Col xs={2} style={{padding: 0}}>
          <FormInput
            label='User'
            value={state.user}
            onChange={event => setState({
              ...state,
              user: event.target.value,
            })}
          />
        </Col>
        <Col xs={8} style={{padding: 0}}>
          <FormInput
            label='Content'
            value={state.content}
            onChange={event => setState({
              ...state,
              content: event.target.value,
            })}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={2} style={{padding: 0}}>
          <Button onClick={() => onSend()}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)
