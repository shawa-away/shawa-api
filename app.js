const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./graphql/resolvers');

const loaders = require('./loaders');

const server = new GraphQLServer({
  typeDefs: 'graphql/schema.graphql',
  resolvers
});

loaders.init(server.express);

module.exports = server;
