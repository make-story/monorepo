import React, { ReactElement } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import Test from '@/common/components/test/Test';
import { testReselect } from '@/common/store/test/testSelector';
import {
  increment,
  decrement,
  incrementByAmount,
} from '@/common/store/test/testSlice';

const TestContainer = (): ReactElement => {
  /**
   * Redux Test
   */
  const dispach = useDispatch();
  const value = useSelector(testReselect);
  console.log('value!', value);

  return (
    <>
      <Test />
      <div>{value}</div>
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
