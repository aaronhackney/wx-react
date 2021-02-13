import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import ambientRouter from './routes/ambient';
import helmet from 'helmet';
import fs from 'fs';

const createError = require('http-errors');
const app = express();

// TODO: Log cycling/naming
app.use(logger('common', { stream: fs.createWriteStream('../logs/express.log', { flags: 'a' }) }));

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives:
  {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    fontSrc: ["'self'"],
    imgSrc: ["'self'"],
    objectSrc: ["'self'"],
    reportUri: ["https://ahackney.report-uri.com/r/d/csp/enforce"]
  }
}));
app.use(function (req, res, next) {
  res.header("Report-To", "{ \"group\": \"default\", \"max_age\": 31536000, \"endpoints\": [{ \"url\": \"https://ahackney.report-uri.com/a/d/g\" }], \"include_subdomains\": true }");
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../dist-frontend')));
app.use('/', indexRouter);
app.use('/v1/devices', ambientRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
