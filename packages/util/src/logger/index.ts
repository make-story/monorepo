/*
-
로깅 라이브러리
https://hackernoon.com/the-10-best-nodejs-logging-libraries
Pino
Winston
Bunyan
Morgan
Loglevel
Log4js
Npmlog
Roarr
Tracer
Signale

-
Winston에는 RFC5424 문서에 설명된 지침에 따라 배열된 6가지 기본 로깅 수준이 있습니다.   
{
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}
*/

/**
 * 로그 레벨
 */
const LOG_LEVEL = {
  FATAL: 'FATAL', // 심각
  ERROR: 'ERROR', // 예외처리, 에러
  WARN: 'WARN', // 경고
  INFO: 'INFO', // 정보
  DEBUG: 'DEBUG', // 디버깅
} as const;

type TLogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
type TAnyFunction = (...payload: any[]) => any;

const getListFindRemoveItem = (
  list: any[] = [],
  findFunction: TAnyFunction = () => {},
) => {
  const index = list.findIndex(findFunction);
  let result = null;

  if (-1 < index) {
    result = list[index]; // 조건에 따라 검색된 값
    list.splice(index, 1); // 검색된 값 배열에서 제거
  }

  return result;
};
const findLevel = (item: any) => typeof item === 'string' && item in LOG_LEVEL;
const findLogFunction = (item: any) => typeof item === 'function';

/**
 * logger 전용 커링 함수
 */
function curry(callback: TAnyFunction) {
  let level: TLogLevel | null = null;
  let logFunction: TAnyFunction | null = null;

  return function curried(...args: any) {
    level = getListFindRemoveItem(args, findLevel) || level;
    logFunction = getListFindRemoveItem(args, findLogFunction) || logFunction;

    if (
      callback.length <= args.length ||
      (level && 1 <= args.length) ||
      (logFunction && 1 <= args.length) ||
      (!level && !logFunction && args.length === 1)
    ) {
      const result = callback?.apply(null, [level, logFunction, ...args]);
      level = null;
      logFunction = null;
      return result;
    }

    return (...moreArgs: any) => curried.apply(null, args.concat(moreArgs));
  };
}

/**
 * 로깅 기능
 */
const logger = curry(
  (
    // curry (커링) 함수의 경우, 파라미터의 기본값 설정 금지!
    level: (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL],
    logFunction: TAnyFunction | null,
    ...payload: any[]
  ): any => {
    // [0]: 에러 레벨, [1]: 출력 함수, [2]: 메시지와 그외 파라미터
    // [0]: 에러 레벨, [1]: 메시지와 그외 파라미터
    // [0]: 메시지와 그외 파라미터
    if (!level) {
      level = LOG_LEVEL.DEBUG;
    }
    if (!logFunction) {
      switch (level) {
        case LOG_LEVEL.FATAL:
        case LOG_LEVEL.ERROR:
          logFunction = console?.error;
          break;
        case LOG_LEVEL.WARN:
          logFunction = console?.warn;
          break;
        case LOG_LEVEL.INFO:
          logFunction = console?.info;
          break;
        case LOG_LEVEL.DEBUG:
          logFunction = console?.debug;
          break;
      }
      if (!logFunction) {
        logFunction = console.log;
      }
    }

    return logFunction(level, ...payload);
  },
);

export { LOG_LEVEL, logger };
