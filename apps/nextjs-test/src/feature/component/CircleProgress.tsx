/**
 * https://codepen.io/witblog/pen/wvgRreO
 */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';

interface TestStyledProps {
  maxHeight?: string;
}

/*
body { background-color: #222; }
.circle_progress_wrap {
  position: relative;
  width: 120px;
  height: 120px;
}
.circle_progress { transform: rotate(-90deg); }
.frame, .bar { fill: none; }
.frame { stroke: #e6e6e6; }
.bar {
	stroke: #03c75a;
	stroke-linecap: round;
}
.value {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  text-align: center;
  color: #888;
  font-size: 16px;
  line-height: 120px;
}
*/
const Styled = {
  globalStyle: css`
    background-color: #222;
  `,
  circle_progress_wrap: styled.div`
    position: relative;
    width: 120px;
    height: 120px;
  `,
  circle_progress: styled.svg`
    transform: rotate(-90deg);
  `,
  circle: styled.circle`
    fill: none;
    ${({ stroke }) =>
      css`
        stroke: ${stroke};
      `}
    ${({ strokeLinecap }) => css`
      stroke-linecap: ${strokeLinecap};
    `}
  `,
  value: styled.strong`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    color: #888;
    font-size: 16px;
    line-height: 120px;
  `,
  test: styled.div<TestStyledProps>`
    ${({ maxHeight }) => css`
      max-height: ${maxHeight};
    `}
    & > * {
      width: 100%;
    }
  `,
};

export default function Index() {
  useEffect(() => {
    const control: HTMLElement = document.getElementById('control')!;
    const bar: HTMLElement = document.querySelector('.bar')!;
    const value: HTMLElement = document.querySelector('.value')!;

    const RADIUS = 54;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    function progress(per: number) {
      const progress = per / 100;
      const dashoffset = CIRCUMFERENCE * (1 - progress);

      value.innerHTML = per + '%';
      bar.style.strokeDashoffset = `${dashoffset}`;
    }

    control.addEventListener('input', function (event: any) {
      progress(event.target.valueAsNumber);
    });
    control.addEventListener('change', function (event: any) {
      progress(event.target.valueAsNumber);
    });

    bar.style.strokeDasharray = `${CIRCUMFERENCE}`;
    progress(60);
  }, []);

  return (
    <>
      <Global styles={[Styled.globalStyle]} />
      <Styled.test maxHeight={'10px'} />
      <div className='circle_progress_wrap'>
        <svg className='circle_progress' width='120' height='120' viewBox='0 0 120 120'>
          <circle className='frame' cx='60' cy='60' r='54' strokeWidth='12' />
          <circle className='bar' cx='60' cy='60' r='54' strokeWidth='12' />
        </svg>
        <input id='control' type='range' value='60' />
        <strong className='value'></strong>
      </div>
      TEST
    </>
  );
}
