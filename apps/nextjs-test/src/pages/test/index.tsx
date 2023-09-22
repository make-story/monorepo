import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import ReRenderTestContainer from '@/test/component/test/ReRenderTestContainer';

const Index = ({ test }: any) => {
  console.log(test);
  return <ReRenderTestContainer />;
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  return {
    props: {
      test: true,
    },
  };
}

export default Index;
