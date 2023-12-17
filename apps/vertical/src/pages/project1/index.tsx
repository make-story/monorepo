import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import { wrapper } from '@/store';
import { initializeApollo } from '@/common/apollo/client/apolloClient';
import { QUERY_BOOKS } from '@/project1/queries/books/book.query';
import TestContainer from '@/project1/containers/test/TestContainer';
import ReRenderTestContainer from '@/project1/containers/reRenderTest/ReRenderTestContainer';
import ReRenderTest from '@/project1/components/reRenderTest/ReRenderTest';

const Test2 = ({ isTest }: any) => {
  console.log('isTest!', isTest);

  /**
   * 환경변수 Test
   */
  console.log('process.env.TEST', process.env.TEST); // 서버사이드 전용 (next.config.js 에 수동으로 주입된 일부 제외)
  console.log('process.env.NEXT_PUBLIC_TEST', process.env.NEXT_PUBLIC_TEST); // 서버/클라이언트 모두 사용

  return (
    <>
      <TestContainer />
      <ReRenderTest />
      <ReRenderTestContainer />
    </>
  );
};

/*export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  return {
    props: {
      isTest: true,
    },
  };
}*/
export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const { query } = context;

  /**
   * 환경변수 Test
   */
  console.log('process.env.TEST', process.env.TEST); // 서버사이드 전용 (next.config.js 에 수동으로 주입된 일부 제외)
  console.log('process.env.NEXT_PUBLIC_TEST', process.env.NEXT_PUBLIC_TEST); // 서버/클라이언트 모두 사용

  /**
   * 서버사이드 GraphQL Test
   */
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: QUERY_BOOKS,
  });
  console.log('graphql server side data!', data);

  return {
    props: {
      isTest: true,
    },
  };
});

export default Test2;
