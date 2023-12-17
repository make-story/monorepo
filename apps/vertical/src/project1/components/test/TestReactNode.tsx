import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  UIEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface Props extends PropsWithChildren {
  bar: ReactNode;
}

export default function ({ bar }: Props): ReactElement {
  const Navigation = useMemo((): ReactNode => {
    if (React.isValidElement(bar)) {
      const props = { title: 'test!!!' };
      return React.cloneElement(bar, props);
    }
    return bar;
  }, [bar]);

  return <>{Navigation && <>{Navigation}</>}TEST</>;
}
