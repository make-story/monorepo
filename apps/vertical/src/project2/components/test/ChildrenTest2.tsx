import React, { PropsWithChildren, ReactElement, useMemo } from 'react';

interface Props {
  children: (arg0: string) => {};
}

const ChildrenTest2 = ({ children }: Props): ReactElement => {
  return <>{children?.('children 함수 실행!')}</>;
};

export default ChildrenTest2;
