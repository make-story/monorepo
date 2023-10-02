const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { parse } = require('url');
const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // req.cookies 객체
//const cors = require('cors');
//const helmet = require('helmet'); // 웹 취약성으로부터 서버를 보호해주는 보안 모듈

// node 예외처리
process.on('uncaughtException', error => {
  console.log('uncaughtException ', error);
});

// env 설정
const envPath = path.join(__dirname, `.envs/.env.${process.env.NODE_ENV}`);
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  //process.exit();
}
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Next.js를 Express와 연결 - 같은 포트에서 실행
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  // express
  const server = express();

  // https://expressjs.com/ko/resources/middleware.html
  const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  //server.use(cors(corsOptions)); // cors
  //server.use(helmet());
  server.use(express.json()); // json request body 파싱
  server.use(express.urlencoded({ extended: true })); // body-parser
  server.use(cookieParser()); // process.env.COOKIE_SECRET
  server.use(express.static(path.join(__dirname, 'public'))); // public 정적 경로
  /*server.use('/', function (req, res, next) { // HTTP 호출 미들웨어 기능적 요소 주입 
    return next();
  });*/

  server.get('/', function (req, res, next) {
    const { page } = req.params || {};
    const { host = '' } = req.headers || {};

    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // TODO: 추후 변경 필요
    return res.redirect('/map');
  });
  server.get('/dummy/*', (req, res) => {
    const { params, query } = req;
    const filename = params[0] || '';
    const isContent = /content\//.test(filename);

    const delay = amount =>
      new Promise((resolve, reject) => setTimeout(resolve, amount));
    const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
    const dateTime = (date = new Date()) => {
      return {
        year: date.getFullYear(),
        month: `0${date.getMonth() + 1}`.slice(-2),
        day: `0${date.getDate()}`.slice(-2),
        hour: `0${date.getHours()}`.slice(-2),
        minute: `0${date.getMinutes()}`.slice(-2),
        second: `0${date.getSeconds()}`.slice(-2),
      };
    };

    //console.log('params', params);
    //console.log('query', query);
    if (fs.existsSync(path.join(__dirname, `./dummy/${filename}.json`))) {
      fs.readFile(
        path.join(__dirname, `./dummy/${filename}.json`),
        (error, buffer) => {
          // 응답이 바로 반환되지 않도록(실제 네트워크 지연이 발생하는 것 처럼) 딜레이 시간 준다.
          const { year, month, day, ...time } = dateTime();
          delay(randomNumberInRange(2000, 5000))
            .then(() =>
              res.json({
                ...JSON.parse(buffer),
                ...(isContent ? { time: Object.values(time).join(':') } : {}),
              }),
            )
            .catch(() => res.json({ error: filename }));
        },
      );
    } else {
      return res.json({ error: filename });
    }
  });

  /*server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.post('*', (req, res) => {
    return handle(req, res);
  });*/
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // http
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  // https (로컬에서만 설정)
  /*if (dev) {
    const portSSL = parseInt(process.env.PORT_SSL, 10) || 3443;
    const options = {
      key: fs.readFileSync('cert/localhost-key.pem'),
      cert: fs.readFileSync('cert/localhost.pem'),
    };
    https.createServer(options, server).listen(portSSL, err => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${portSSL}`);
    });
  }*/
});
