// 더미 데이터
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolver = {
  Query: {
    books: () => {
      // 반환 데이터
      return books;
    },
  },
};

export default resolver;
