import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import StickyContainer from '@/feature/container/StickyContainer';

const Index = ({ test }: any) => {
  console.log(test);
  return <StickyContainer />;
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
