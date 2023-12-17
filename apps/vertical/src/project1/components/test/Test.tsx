import React, { PropsWithChildren, useMemo } from 'react';

import withHoc1 from '@/project1/hocs/withHoc1';

const Test = ({ children }: PropsWithChildren) => {
  // ENV 값 접근 테스트
  console.log('process.env.NEXT_PUBLIC_TEST', process.env.NEXT_PUBLIC_TEST);
  console.log('process.env.REACT_APP_ENV', process.env.REACT_APP_ENV);

  return (
    <>
      <h1>Test</h1>
    </>
  );
};

export default withHoc1(Test);
