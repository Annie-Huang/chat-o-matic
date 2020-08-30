const {GraphQLServer} = require('graphql-yoga');

// typeDefs is like a schema. ID! means the ID field is required.
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }
  
  type Query {
    messages: [Message!]
  }
`;

// How do I get the data (through resolvers). Need to match the keys in the type definition
const resolvers = {
  Query: {
    messages: () => messages,
  }
}
const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({port}) => {
  console.log(`Server on http://localhost:${port}`)
})
