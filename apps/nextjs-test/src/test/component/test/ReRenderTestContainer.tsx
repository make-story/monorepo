import React, { useCallback, useState } from 'react';

import ReRenderTest1 from './ReRenderTest1';
import ReRenderTest2 from './ReRenderTest2';

const ReRenderTestContainer = () => {
  const [testCount1, setTestCount1] = useState<number>(0);
  const [testCount2, setTestCount2] = useState<number>(0);
  const onClick1 = useCallback(() => {
    setTestCount1(prev => prev + 1);
  }, [setTestCount1]);
  const onClick2 = useCallback(() => {
    setTestCount2(prev => prev + 1);
  }, [setTestCount2]);

  return (
    <>
      <div>TEST</div>
      <p>{testCount1}</p>
      <p>{testCount2}</p>
      <ReRenderTest1 onClick={onClick1} />
      <ReRenderTest2 onClick={onClick2} />
    </>
  );
};

export default ReRenderTestContainer;
