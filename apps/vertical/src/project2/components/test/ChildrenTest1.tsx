import React, { PropsWithChildren, useMemo } from 'react';

const ChildrenTest1 = ({ children }: PropsWithChildren) => {
  // Children 테스트
  const count = React.Children.count(children);
  const Component = useMemo(() => {
    // https://fe-developers.kakaoent.com/2021/211022-react-children-tip/
    // console.log(React.Children); // {map: ƒ, forEach: ƒ, count: ƒ, toArray: ƒ, only: ƒ}
    return React.Children.map(children, (child, index: number) => {
      return <div data-child={index}>{child}</div>;
    });
  }, [children]);

  return (
    <>
      {count}
      {Component}
    </>
  );
};

export default ChildrenTest1;
