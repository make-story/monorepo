import '@makeapi/common';

declare module 'react-reveal/Fade';

export declare global {
  declare module '*.svg' {
    import * as React from 'react';

    export const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default SVGComponent;
  }

  declare module '*.png' {
    const value: any;
    export default value;
  }

  declare module '*.gif' {
    const value: any;
    export default value;
  }
  declare namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}
