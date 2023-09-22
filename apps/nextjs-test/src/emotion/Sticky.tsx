import React, { PropsWithChildren, ReactElement } from 'react';
import styled from '@emotion/styled';

export interface StickyPositionProps {
  top?: string | number | boolean;
  bottom?: string | number | boolean;
  className?: string;
}

export type StickyProps = StickyPositionProps & PropsWithChildren;

const Styled = {
  Wrap: styled.div<Partial<StickyProps>>`
    position: sticky;
    top: ${({ top }) => (top === true ? 0 : top)};
    bottom: ${({ bottom }) => (bottom === true ? 0 : bottom)};
  `,
};

function Sticky({
  children,
  top,
  bottom,
  className,
}: StickyProps): ReactElement {
  return (
    <Styled.Wrap className={className} top={top} bottom={bottom}>
      {children}
    </Styled.Wrap>
  );
}

export default Sticky;
