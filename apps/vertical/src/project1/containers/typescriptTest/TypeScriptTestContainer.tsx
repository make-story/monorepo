import { PropsWithChildren, ReactElement } from 'react';

import TypeScriptTest from '@/project1/components/typescriptTest/TypeScriptTest';

const TypeScriptTestContainer = ({
  children,
}: PropsWithChildren): ReactElement => {
  return (
    <>
      <div>
        <TypeScriptTest />
        {children}
      </div>
    </>
  );
};

export default TypeScriptTestContainer;
