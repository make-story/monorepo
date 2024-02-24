import React, { PropsWithChildren, ReactElement } from 'react';

interface IProp {
  onClick: () => void;
}

const ReRenderTest2 = ({ onClick }: PropsWithChildren<IProp>) => {
  return (
    <>
      <button onClick={onClick}>버튼 클릭2</button>
    </>
  );
};

export default React.memo(ReRenderTest2);
