/**
 * 'node:' imports
 * node 내부 모듈 구분
 * v16.0.0, v14.18.0 지원 (import, require 방식)
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import { parse } from 'node:url';
import os from 'node:os';
import cluster from 'node:cluster';
import createError from 'http-errors';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser'; // req.cookies 객체
import cors from 'cors';
import { renderFile } from 'ejs';

import routerTest from '../router/test.js';

/**
 * node 예외처리
 * UncatchedException 이 발생하면 Node.js 인스턴스가 죽음(서버다운) 방지
 * https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
 */
process.on('uncaughtException', error => {
  console.log('uncaughtException ', error);
});

/**
 * env 환경변수
 *
 * dotenv 적용 우선순위
 * https://www.npmjs.com/package/dotenv-flow#variables-overwritingpriority
 */
dotenv.config();
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('APP_ENV', process.env.APP_ENV);
console.log('PROXY_API_URI', process.env.PROXY_API_URI);
const __dirname = path.resolve(); // 'ReferenceError: __dirname is not defined in ES module scope ... ' 에러대응
const isDev = process.env.NODE_ENV !== 'production';
const hostname = process.env.NEXT_PUBLIC_SERVICE_HOSTNAME;
const port = Number(process.env.PORT) || 9040;

/**
 * express
 */
const app = express();

// app.set(name, value)
// https://expressjs.com/ko/api.html#app.settings.table
// http://expressjs.com/en/guide/using-template-engines.html
app.engine('ejs', renderFile);
app.set('view engine', 'ejs'); // view 엔진 설정 - index.ejs 등 확장자 - http://ejs.co/
app.set('views', path.resolve(__dirname, './page')); // views 디렉토리 설정 - response.render('경로') 사용

// middleware - 기능요소
// https://expressjs.com/ko/resources/middleware.html
//app.use(helmet());
app.use(express.json()); // json request body 파싱
app.use(express.urlencoded({ extended: true })); // body-parser
app.use(cookieParser()); // process.env.COOKIE_SECRET
app.use(compression()); // Gzip 압축
app.use(cors()); // cors 관련 정책
app.use('/public', express.static(path.join(__dirname, 'public'))); // public 정적 경로

// request 에 값 포함하여 전달
app.use((request, response, next) => {
  // 전역 데이터 설정 (사용자 정보 등)
  //request.passport = passport;
  //Object.assign(response.locals, 'test');
  //request.locals.user = request?.user || '';
  next();
});

// 스트림
// 스트림을 이용하면 큰 파일을 읽을 때도 메모리를 효율적으로 사용할 수 있다. (readFile 를 이용할 경우 파일의 전체내용을 메모리로 가져오기 때문에 메모리에 여유가 없다면 부담이 될 수 있다.)
/*app.get('/readFile', (request, response) => {
	const fileStream = fs.createReadStream('./bog_file.zip');
	fileStream.pipe(response);
});*/
/*app.post('/files/editor', multer({ dest: __dirname + '/uploads/'}).any(), function(request, response) {
	const files = request.files;
});*/

// redirect HTTP to HTTPS
/*app.all('*', (request, response, next) => { 
	let protocol = request.headers['x-forwarded-proto'] || request.protocol; 
	if(protocol == 'https') { 
		next(); 
	}else { 
		let from = `${protocol}://${request.hostname}${request.url}`; 
		let to = `https://'${request.hostname}${request.url}`; 
		// log and redirect 
		console.log(`[${request.method}]: ${from} -> ${to}`); 
		response.redirect(to); 
	} 
});*/

// routes - app.use('라우트', '하위 라우트')
// app.use 는 지정 경로의 하위 모든 경로 응답 / app.get, app.post, app.put 등은 명확한 특정 경로에 대해서만 응답
app.use('/ysm', (request, response) => response.end('TEST SERVER'));
app.use('/', routerTest);

/**
 * error handler
 */
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

/**
 * 서버 콜 test
 */
// https://www.npmjs.com/package/node-fetch
/*async function getRequest() {
	const url = 'http://makestory.net/media/categories/documents';
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
}
getRequest();*/

/**
 * 서버 실행
 */
/*const server = app.listen(process.env.PORT, () => {
	console.log(`Server ${process.env.PORT}`);
});*/
//const server = app.listen(process.env.PORT, () => console.log(`WebService Server`, `http://localhost:${process.env.PORT}`));
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log('WebService Server', process.env.PORT);
});
/*if(fs.existsSync(path.resolve(__dirname, '../.key/ssl.json'))) { // HTTPS SSL
	const ssl = require(path.resolve(__dirname, '../.key/ssl.json'));
	if(ssl && typeof ssl === 'object' && fs.existsSync(ssl.pathKey) && fs.existsSync(ssl.pathCert)) {
		const credentials = {
			key: fs.readFileSync(ssl.pathKey), // 키 파일의 경로
			cert: fs.readFileSync(ssl.pathCert), // 인증서 파일의 경로
		};
		const httpsServer = https.createServer(credentials, app);
		httpsServer.listen(process.env.PORT_SSL, () => {
			console.log('Server SSL', process.env.PORT_SSL);
		});
	}
}*/
