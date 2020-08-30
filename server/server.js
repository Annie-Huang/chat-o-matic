const {GraphQLServer, PubSub} = require('graphql-yoga');

const messages = [];

// typeDefs is like a schema. ID! means the ID field is required.
// mutation is list post in the rest world
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }
  
  type Query {
    messages: [Message!]
  }
  
  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }
  
  type Subscription {
    messages: [Message!]
  }
`;

// How do I get the data (through resolvers). Need to match the keys in the type definition
const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (parent, {user, content}) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content
      });
      return id;
    }
  },
  // https://github.com/apollographql/graphql-subscriptions
  Subscription: {
    messages: {
      subscribe: (parent, args, {pubsub}) => {
        // pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC)
        const channel = Math.random().toString(36).slice(2,15);
        return pubsub.asyncIterator(channel);
      },
    },
  },
}

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: {pubsub}});
server.start(({port}) => {
  console.log(`Server on http://localhost:${port}`)
})
