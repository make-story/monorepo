import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import ObserverContainer from '@/feature/container/ObserverContainer';

const Index = ({ test }: any) => {
  console.log(test);
  return <ObserverContainer />;
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
