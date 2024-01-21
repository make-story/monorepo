import React, { useState, useCallback, PropsWithChildren } from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import ReRenderTestContainer from '@/test/component/test/ReRenderTestContainer';

// 상위 컴포넌트 변경에 따른 하위 컴포넌트 테스트
const ChildComponent = () => {
  console.log('ChildComponent is rendering!');
  return <div>Hello World!</div>;
};
const ChildComponentMemo = React.memo(ChildComponent);

// 상위 컴포넌트 변경에 따른 하위 컴포넌트 + props 테스트
const ChildComponentProps = ({
  onClick,
}: PropsWithChildren<{ onClick: any }>) => {
  console.log('ChildComponent is rendering!', onClick);
  return <div>Hello World!</div>;
};
const ChildComponentPropsMemo = React.memo(ChildComponentProps);

// 상위 컴포넌트 내부 자식 컴포넌트를 선언방식으로 했을 경우
const ParentComponent = () => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {/* React.memo 사용하여 리렌더 방지!! */}
      {/* (ChildComponent 의 상위 컴포넌트 ParentComponent 상태 변경이 일어 났지만,React.memo 사용하여 자식 컴포넌트 리렌더 방지) */}
      <ChildComponentMemo />
      {/*<ChildComponent />*/}
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

// 상위 컴포넌트 내부 자식 컴포넌트는 children 으로 받았을 경우
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

// 상위 컴포넌트 내부 자식 컴포넌트에게 props 를 전달했을 경우
const ParentComponentProps = () => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);
  const onClick = useCallback(() => {
    console.log('Click!!!');
  }, []);

  return (
    <div>
      {/* useCallback + React.memo 사용하여 리렌더 방지!! */}
      {/* (ChildComponentProps 의 상위 컴포넌트 ParentComponentProps 상태변경으로 prps 로 넘기는 함수도 재생성이 일어나야 하지만 useCallback 으로 재생성을 방지) */}
      <ChildComponentPropsMemo onClick={onClick} />
      {/*<ChildComponentPropsMemo onClick={() => console.log('Click!!!')} />*/}
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

// 리렌더할 때 Porps 로 넘기는 값이 변하는지 여부
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
