const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const hbs = require('hbs');

dotenv.config()

const partialsDir = __dirname + '/views/partials';
const filenames = fs.readdirSync(partialsDir);
filenames.forEach(function (filename) {
  let matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  let name = matches[1];
  let template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const wordRouter = require('./routes/word');
const testRouter = require('./routes/test');
const resultRouter = require('./routes/result');
const slideRouter = require('./routes/slides');

const app = express();
app.use(cors());


app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/word', wordRouter);
app.use('/test', testRouter);
app.use('/result', resultRouter);
app.use('/slides', slideRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
