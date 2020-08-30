const {GraphQLServer} = require('graphql-yoga');

// typeDefs is like a schema. ID! means the ID field is required.
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }
  
  type Query {
    messages: [Messages!]
  }
`;

const server = new GraphQLServer({typeDefs});
server.start(({port}) => {
  console.log(`Server on http://localhost:{$port}`)
})

