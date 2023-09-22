import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

const Index = () => {
  return <>Test2</>;
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return {
    props: {
      test: true,
    },
  };
};

export default Index;
