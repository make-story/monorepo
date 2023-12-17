import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import { wrapper } from '@/store';
import TestContainer from '@/project2/containers/test/TestContainer';
import ValidateContainer from '@/project2/containers/validate/ValidateContainer';

const Test1 = ({ isTest }: any) => {
  console.log('isTest!', isTest);

  return (
    <>
      <ValidateContainer />
      <TestContainer />
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
export const getServerSideProps = wrapper.getServerSideProps(context => {
  const { query } = context;

  return {
    props: {
      isTest: true,
    },
  };
});

export default Test1;
