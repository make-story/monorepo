import * as React from 'react';
import Document, { Html, DocumentContext, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ko'>
        <Head>
          <meta charSet='utf-8' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
