export const resolver = {
  Query: {
    myQuery(root, args, context, info) {
      return {
        username: 'jhon',
      };
    },
  },
};