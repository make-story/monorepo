/**
 * https://velog.io/@surim014/react-rerender
 * https://felixgerschau.com/react-rerender-components/#structure-of-your-components
 * https://codepen.io/fgerschau/pen/wvKdrdM
 */
import React, { useCallback, useState, useRef, PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import ReRenderTest1 from '@/project1/components/reRenderTest/ReRenderTest1';
import ReRenderTest2 from '@/project1/components/reRenderTest/ReRenderTest2';
import ReRenderTestHash from '@/project1/components/reRenderTest/ReRenderTestHash';

const Styled = {
  Spacer: styled.div`
    height: 20px;
  `,
};

const Updates = ({ updates }: PropsWithChildren<{ updates: any }>) => (
  <h4 className='update'>
    Paints
    <br />
    {updates}
  </h4>
);

const Tile = ({ children }: PropsWithChildren) => {
  const updates = useRef(0);
  return (
    <div>
      No memo
      <Updates updates={updates.current++} />
      {children}
    </div>
  );
};

const TileMemo = React.memo(
  ({ children }: PropsWithChildren) => {
    const updates = useRef(0);
    return (
      <div>
        Memo
        <Updates updates={updates.current++} />
        {children}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // evaluate whether the props have changed and if
    // the component should update
    return true;
  },
);

const ReRenderTestContainer = () => {
  const updates = useRef(0);
  const [text, setText] = useState('');

  const [testCount1, setTestCount1] = useState<number>(0);
  const [testCount2, setTestCount2] = useState<number>(0);

  const onClick1 = useCallback(() => {
    setTestCount1(prev => prev + 1);
  }, []);
  const onClick2 = useCallback(() => {
    setTestCount2(prev => prev + 1);
  }, []);

  return (
    <>
      <ReRenderTestHash />
      <div style={{ border: '1px solid' }}>
        <p>{testCount1}</p>
        <p>{testCount2}</p>
        <ReRenderTest1 onClick={onClick1} />
        <ReRenderTest2 onClick={onClick2} />
        <hr />
        <input
          value={text}
          placeholder='Write something'
          onChange={e => setText(e.target.value)}
        />
        <Styled.Spacer />
        <Updates updates={updates.current++} />
        <Styled.Spacer />
        <Tile>
          <Tile>
            <Tile />
          </Tile>
          <Tile />
        </Tile>
        <Styled.Spacer />
        <TileMemo>
          <TileMemo>
            <TileMemo />
          </TileMemo>
          <TileMemo />
        </TileMemo>
      </div>
    </>
  );
};

export default ReRenderTestContainer;
