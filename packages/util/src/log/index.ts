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

const LOG_LEVEL = {
  FATAL: 'FATAL', // 심각
  ERROR: 'ERROR', // 예외처리 등
  WARN: 'WARN', // 경고
  INFO: 'INFO', // 정보
  DEBUG: 'DEBUG', // 디버깅
} as const;

const logger = (...payload: any[]): any => {
  // [0]: 에러 레벨, [1]: 출력 함수, [2]: 메시지와 그외 파라미터
  // [0]: 에러 레벨, [1]: 메시지와 그외 파라미터
  // [0]: 메시지와 그외 파라미터
  let level = LOG_LEVEL.INFO;
  let log = console.log;
  const setMessage = (...message: any[]) => {
    log(...message);
  };
  const setLogFunction = (...payload: any[]) => {
    if (typeof payload[0] === 'function') {
      // log 출력 함수 세팅
      log = payload[0];
      if (payload.length === 1) {
        return setMessage;
      }
    } else {
      setMessage(...payload.slice(1));
    }
  };
  // 에러 레벨
  if (payload[0]?.toUpperCase() in LOG_LEVEL) {
    level = payload[0]?.toUpperCase();
    if (payload.length === 2) {
      return setLogFunction;
    }
  }
};

export { LOG_LEVEL, logger };
