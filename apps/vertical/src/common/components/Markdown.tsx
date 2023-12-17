/**
 * children 부분 초기화된 CSS 노출
 */
import React, { ReactElement } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from '@emotion/styled';

type MarkdownProps = Options;

const Styled = {
  MarkdownWrap: styled.div`
    & > * {
      all: revert;
    }
  `,
  SanitizeWrap: styled.div`
    white-space: initial;
    & * {
      all: revert !important;
    }
  `,
};

function Markdown({ children, ...props }: MarkdownProps): ReactElement {
  return (
    <Styled.MarkdownWrap>
      <ReactMarkdown {...props} remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </Styled.MarkdownWrap>
  );
}

export default Markdown;
