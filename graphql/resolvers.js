module.exports = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
  Mutation: {
    createUser: (parent, { name }) => {
      console.log(name)
      return `Hello ${name}`;
    },
  },
}