/**
 * https://velog.io/@mogulist/understanding-react-rerender-easily
 */
import React, { useEffect, useState, useCallback } from 'react';

export default function ReRenderTest() {
  return (
    <div className='App'>
      <h2>Rerendering Example</h2>
      <Parent />
    </div>
  );
}

const useValue = () => {
  const [value, setValue] = useState(0);

  /**
   * setTimeout 활용 자동 값 변환
   */
  useEffect(() => {
    value < 3 &&
      setTimeout(() => {
        setValue(value => value + 1);
      }, 1500);
  }, [value]);

  return value;
};

const Parent = () => {
  const value = useValue();
  const handleClick = () => {
    console.log('handleClick');
  };
  const memoizedHandleClick = useCallback(() => handleClick, []);

  return (
    <>
      <div>value: {value}</div>
      {/* React.ment 사용 */}
      {/*<ChildA />*/}
      <MemoizedChildA />

      <ChildB value={value} />

      {/* useCallback 을 사용했음에도 */}
      {/* ChildC는 props.onClick 이 동일한지 여부는 체크하지 않고, 그저 부모 컴포넌트가 리렌더링되었기 때문에 리렌더링되는 것입니다. */}
      {/* 이렇게 useCallback()을 사용한다면 원하는 최적화 효과가 발생하지 않을 뿐만 아니라 오히려 useCallback()의 dependency를 체크하는데 CPU를 낭비하게 되는 셈입니다. */}
      {/*<ChildC onClick={handleClick} />*/}
      {/*<ChildC onClick={memoizedHandleClick} />*/}

      {/* 함수를 자식 컴포넌트에게 전달할 때 불필요한 리렌더링이 많이 발생하는 것을 줄이려면, */}
      {/* useCallback()과 memo()를 함께 사용해주어야 효과가 있다는 것을 알 수 있습니다. */}
      <MemoizedChildC onClick={memoizedHandleClick} />
    </>
  );
};

const ChildA = () => <GrandChildren color='red' />;
const ChildB = ({ value }: any) => <GrandChildren color='blue' />;
const ChildC = ({ onClick }: any) => <GrandChildren color='green' />;
const MemoizedChildA = React.memo(ChildA);
const MemoizedChildC = React.memo(ChildC);

const GrandChildren = ({ color }: any) => (
  <div>
    {Array.from({ length: 3 }).map((_, i) => (
      <GrandGrandChild key={i + 1} order={i} color={color} />
    ))}
  </div>
);

const GrandGrandChild = ({ order, color }: any) => (
  <div style={{ color }}>GrandGrandChild {order}</div>
);
