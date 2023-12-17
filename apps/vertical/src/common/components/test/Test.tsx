import React, { ReactElement } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const Styled = {
  IconWrap: styled.div`
    min-width: 30px;
  `,
};

const Test = (): ReactElement => {
  return (
    <>
      Test
      <div>
        <ul>
          <li>
            <Link href='/project1'>project1 (SPA 방식)</Link>
          </li>
          <li>
            <a href='/project1'>project1 (MPA 방식)</a>
          </li>
        </ul>
      </div>
      <Styled.IconWrap>IconWrap</Styled.IconWrap>
    </>
  );
};

export default Test;
