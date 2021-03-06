var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

knex = require('knex')({
  client: 'mysql',
  connection: {
      host : 'localhost',
      port: 3306,
      user : 'msp',
      password : 'nautilus',
      database : 'padron'
  },
  debug: false,
  pool: { min: 0, max: 40 }
});

var index = require('./routes/index');
var registros = require('./routes/registros');
var exportar = require('./routes/exportar');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//ruta de jquery
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')));

//ruta de bootstrap
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));


//ruta de bootstrap-datepicker
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap-datepicker/dist')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/registros', registros);
app.use('/exportar', exportar);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
