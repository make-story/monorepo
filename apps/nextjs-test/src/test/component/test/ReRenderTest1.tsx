import React, { PropsWithChildren, ReactElement } from 'react';

interface IProp {
  onClick: () => void;
}

const ReRenderTest1 = ({ onClick }: PropsWithChildren<IProp>) => {
  return (
    <>
      <button onClick={onClick}>버튼 클릭1</button>
    </>
  );
};

export default React.memo(ReRenderTest1);
