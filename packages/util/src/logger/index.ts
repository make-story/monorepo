/* eslint-disable @typescript-eslint/no-empty-function */
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

const getListFindItem = (
  list: any[] = [],
  findFunction: TAnyFunction = () => {},
  { isFindItemRemove }: { isFindItemRemove?: boolean } = {},
) => {
  const index = list.findIndex(findFunction);
  let result = null;

  if (-1 < index) {
    result = list[index]; // 조건에 따라 검색된 값
    isFindItemRemove && list.splice(index, 1); // 검색된 값 배열에서 제거
  }

  return result;
};
const findLevel = (item: any) => typeof item === 'string' && item in LOG_LEVEL;
const findLogFunction = (item: any) => typeof item === 'function';

/**
 * logger 전용 커링 함수
 */
function curry(callback: TAnyFunction): any {
  // 이 부분에 클로저 변수를 선언하면, curry 하려는 모든 callback 함수에 해당 변수가 글로벌하게 작동한다.
  /*
  const logger = curry(() => {});
  const test1 = logger('TEST1');
  const test2 = logger('TEST2');
  test1, test2 모두 같은 클로저 변수를 바라보기 때문에, 의도한대로 코드가 작동안할 수 있음 
  */
  return function curried(
    this: { level?: TLogLevel | null; logFunction?: TAnyFunction | null },
    ...args: any[]
  ): any {
    const level: TLogLevel | null =
      this?.level ||
      getListFindItem(args, findLevel, { isFindItemRemove: true });
    const logFunction: TAnyFunction | null =
      this?.logFunction ||
      getListFindItem(args, findLogFunction, { isFindItemRemove: true });

    if (
      /*callback.length <= args.length ||*/
      (level && 1 <= args.length) ||
      (logFunction && 1 <= args.length) ||
      (!level && !logFunction && args.length === 1)
    ) {
      return callback?.apply(null, [level, logFunction, ...args]);
    }

    return (...moreArgs: any[]): any =>
      curried.apply({ level, logFunction }, args.concat(moreArgs));
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
logger.error = logger(LOG_LEVEL.ERROR);
logger.warn = logger(LOG_LEVEL.WARN);
logger.info = logger(LOG_LEVEL.INFO);
logger.debug = logger(LOG_LEVEL.DEBUG);

export { LOG_LEVEL, logger };
