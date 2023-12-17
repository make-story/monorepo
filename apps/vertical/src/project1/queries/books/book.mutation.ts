import { gql } from '@apollo/client';

export const MUTATION_UPDATE_BOOK = gql`
  mutation updateBook($id: ID!) {
    updateBook(id: $id) {
      id
    }
  }
`;
