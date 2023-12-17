/**
 * 테스트 컨테이너
 */
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Test from '@/project1/components/test/Test';
import { QUERY_DISPLAY_TEST } from '@/project1/queries/display/display.query';
import { MUTATION_DISPLAY_TEST } from '@/project1/queries/display/display.mutation';
import { QUERY_BOOKS } from '@/project1/queries/books/book.query';
import { MUTATION_UPDATE_BOOK } from '@/project1/queries/books/book.mutation';

const TestContainer = () => {
  /**
   * GraphQL Test
   */
  const { data, loading, error } = useQuery(QUERY_BOOKS);
  const [mutationUpdateBook] = useMutation(MUTATION_UPDATE_BOOK);
  console.log('loading!', loading);
  console.log('data!', data);

  const [mutationDisplayTest] = useMutation(MUTATION_DISPLAY_TEST);
  const handleMutationDisplayTest = async () => {
    try {
      const response = await mutationDisplayTest();

      if (response?.data) {
        // ...
      }
    } catch (exception) {
      console.error('exception', exception);
    }
  };

  return (
    <>
      <Test></Test>
      <div>
        Mutation Test
        <button
          onClick={async () => {
            const response = await mutationUpdateBook({
              variables: { id: 'test' },
            });
            console.log('response', response);
          }}
        >
          Click
        </button>
      </div>
    </>
  );
};

export default TestContainer;
