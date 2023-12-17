/**
 * _app 다음에 실행되는 영역
 * 공통 마크업 관리
 */
import * as React from 'react';
import Document, {
  Html,
  DocumentContext,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { extractCritical } from '@emotion/server';

export default class MyDocument extends Document {
  /**
   * CSS-in-JS 서버사이드 렌더링 처리를 위한 로직
   * https://gist.github.com/colinhacks/c40519a6a050a99091862319151377ec
   * https://soojae.tistory.com/59
   */
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
      pathname: ctx.pathname,
      userAgent: ctx?.req?.headers?.['user-agent'],
    };
  }
  /*static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    // 리액트 렌더링 로직
    ctx.renderPage = () =>
      originalRenderPage({
        // 애플리케이션 전체에 적용하기 위한 로직 (_app)
        enhanceApp: App => App,
        // 각 페이지에 적용하기 위한 로직
        enhanceComponent: Component => Component,
      });

    // 부모 getInitialProps 실행. 위의 커스텀된 renderPage가 포함되어있다.
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      pathname: ctx.pathname,
      userAgent: ctx?.req?.headers?.['user-agent'],
    };
  }*/

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
