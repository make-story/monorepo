const resolver = {
  Query: {},
  Mutation: {
    async mutationDisplayTest(_, params, { dataSources, ...context }) {
      return {};
    },
  },
};

export default resolver;
