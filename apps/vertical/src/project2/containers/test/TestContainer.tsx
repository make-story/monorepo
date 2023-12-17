/**
 * 테스트 컨테이너
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Test from '@/project2/components/test/Test';
import TableCheck from '@/project2/components/test/TableCheck';
import ChildrenTest1 from '@/project2/components/test/ChildrenTest1';
import ChildrenTest2 from '@/project2/components/test/ChildrenTest2';
import { displayReselect } from '@/project2/store/display/displaySelector';
import {
  increment,
  decrement,
  incrementByAmount,
} from '@/project2/store/display/displaySlice';
import { testReselect } from '@/common/store/test/testSelector';

const TestContainer = () => {
  /**
   * Redux Test
   */
  const dispach = useDispatch();
  const displayValue = useSelector(displayReselect);
  const testValue = useSelector(testReselect);
  console.log('displayValue!', displayValue);
  console.log('testValue!', testValue);

  return (
    <>
      <Test />
      <ChildrenTest1>
        <span>AAA</span>
        <span>BBB</span>
        <span>CCC</span>
        <span>DDD</span>
        <span>EEE</span>
        <span>FFF</span>
      </ChildrenTest1>
      <ChildrenTest2>{name => <div>{name}</div>}</ChildrenTest2>
      <TableCheck />
      <div>{displayValue}</div>
      <div>{testValue}</div>
      <button
        onClick={() => {
          dispach(increment());
        }}
      >
        +1(increment)
      </button>
      <button
        onClick={() => {
          dispach(decrement());
        }}
      >
        -1(decrement)
      </button>
      <button
        onClick={() => {
          dispach(incrementByAmount({ value: 5 }));
        }}
      >
        +5
      </button>
    </>
  );
};

export default TestContainer;
