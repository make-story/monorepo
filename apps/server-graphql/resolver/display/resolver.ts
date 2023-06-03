const resolver = {
  Query: {},
  Mutation: {
    async mutationDisplayTest(_: any, params: any, { dataSources, ...context }: any) {
      return {};
    },
  },
};

export default resolver;
