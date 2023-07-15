const fs = require('fs');
const path = require('path');
const express = require('express'); // http://expressjs.com/ko/4x/api.html 가이드 문서
const dotenv = require('dotenv');
const createError = require('http-errors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser'); // req.cookies
const bodyParser = require('body-parser'); // req.body - http://expressjs.com/ko/api.html#req - 익스프레스 4.16.0 버전부터 body-parser 미들웨어의 일부 기능이 익스프레스에 내장

// Exception Handler 등록
// UncatchedException 이 발생하면 Node.js 인스턴스가 죽음(서버다운) 방지
// https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
process.on('uncaughtException', error => {
  console.log('Caught exception: ' + error);
});

// express
dotenv.config(); // 루트 폴더 '.env' 파일
const app = express();
const server = app.listen(9030); // 서버 실행

const htmlProxyController = createProxyMiddleware({
  target: 'http://localhost:9031',
  changeOrigin: true,
  secure: false,
});

//app.use(express.static(path.resolve(__dirname, '../dist')));
//app.use(express.static(path.resolve(__dirname, '../public')));

app.use(cookieParser());
// 익스프레스 4.16.0 버전부터 body-parser 미들웨어의 일부 기능이 익스프레스에 내장
// 'Failed to load resource: the server responded with a status of 413 (Payload Too Large)' 에러를 해결하기 위해 limit 값을 설정해준다.
//app.use(bodyParser.urlencoded({ extended: false, limit: '200mb' })); // parse application/x-www-form-urlencoded
//app.use(bodyParser.json({ limit: '200mb' })); // parse application/json
//app.use(bodyParser.raw()); // 요청의 본문이 버퍼 데이터 일 때
//app.use(bodyParser.text()); // 요청의 본문이 텍스트 데이터 일 때
app.use(express.json({ limit: '200mb' })); // parse application/json
app.use(express.urlencoded({ extended: false, limit: '200mb' })); // parse application/x-www-form-urlencoded

// 사용자 정보
app.use(function (request, response, next) {
  //console.log(request);
  //request.locals.user = request?.user || '';
  next();
});

//app.use('/', require(path.resolve(__dirname, '../routes/index')));
app.use('/', (request, response, next) => {
  console.log('request!!!');
  return htmlProxyController(request, response, next);
});

// catch 404 and forward to error handler
// https://expressjs.com/ko/guide/error-handling.html
app.use((request, response, next) => {
  //const error = new Error(`${request.method} ${request.url} 라우터가 없습니다.`);
  //error.status = 404;
  //next(error);

  // next app.use 파라미터로 error 정보 전달
  next(createError(404));
});
app.use(function (error, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.send('페이지 없음!');
  //response.render('error');
});
