import React, { useState, useCallback, PropsWithChildren } from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import ReRenderTestContainer from '@/test/component/test/ReRenderTestContainer';

const ChildComponent = () => {
  console.log('ChildComponent is rendering!');
  return <div>Hello World!</div>;
};
const ChildComponentMemo = React.memo(ChildComponent);

const ChildComponentProps = ({
  onClick,
}: PropsWithChildren<{ onClick: any }>) => {
  console.log('ChildComponent is rendering!', onClick);
  return <div>Hello World!</div>;
};
const ChildComponentPropsMemo = React.memo(ChildComponentProps);

const ParentComponent = () => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {/* React.memo 사용하여 리렌더 방지 */}
      <ChildComponentMemo />
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const ParentComponentChildren = ({ children }: PropsWithChildren) => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {/* React 컴포넌트를 children 로 받아 리렌더 방지 */}
      {children}
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const ParentComponentProps = () => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);
  const onClick = useCallback(() => {
    console.log('Click!!!');
  }, []);

  return (
    <div>
      {/*<ChildComponentPropsMemo onClick={() => console.log('Click!!!')} />*/}
      {/* useCallback 사용하여 리렌더 방지!!!!! */}
      <ChildComponentPropsMemo onClick={onClick} />
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const ParentComponentValue = ({
  value,
}: PropsWithChildren<{ value: number }>) => {
  const [toggle, setToggle] = useState(false);

  // 현재 컴포넌트가 리렌터될 때 마다, props 로 받은 value 값이 변할 것인가??
  console.log(value);

  return (
    <div>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const Index = ({ test }: any) => {
  console.log(test);
  const randomNumber = () => {
    return Math.random();
  };

  return (
    <>
      <div>
        <h1>React.memo 활용 리렌더 방지</h1>
        <ParentComponent />
        <h1>children 활용 리렌더 방지</h1>
        <ParentComponentChildren>
          <ChildComponent />
        </ParentComponentChildren>
        <h1>리렌더할 때 Porps 로 넘기는 값이 변하는지 여부</h1>
        <ParentComponentValue value={randomNumber()} />
        <h1>React.memo 활용 props 값 리렌더 방지</h1>
        <ParentComponentProps />
      </div>
      <div>
        <ReRenderTestContainer />
      </div>
    </>
  );
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
