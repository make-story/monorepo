import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import { wrapper } from '@/store';
import TestContainer from '@/common/containers/test/TestContainer';

const Common = ({ isTest }: any) => {
  console.log('isTest!', isTest);
  return <TestContainer />;
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

export default Common;
