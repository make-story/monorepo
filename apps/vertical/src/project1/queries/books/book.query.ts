import { gql } from '@apollo/client';

/**
 * API 응답 데이터 구조(인터페이스) 지정
 *
 * 하나의 쿼리에서 여러 GraphQL 쿼리 호출 가능
 */
export const QUERY_BOOKS = gql`
  query Books {
    books {
      title
      author
    }
    test {
      title
      author
    }
  }
`;
