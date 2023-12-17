import { PropsWithChildren, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children }: PropsWithChildren): void {
  useEffect(() => {
    const element = window.document.getElementById('root');
    createPortal(<>{children}</>, element as HTMLElement);
  }, [children]);
}

export default Portal;
