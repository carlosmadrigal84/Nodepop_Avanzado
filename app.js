var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var anunciosRouter = require('./routes/apiv1/anuncios');
const loginController = require('./routes/loginController');
const privadoController = require('./routes/privadoController');
const sessionAuth = require('./lib/sessionAuth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/services'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apiv1/anuncios', anunciosRouter);
app.get('/login', loginController.index);
app.post('/apiv1/login', loginController.loginJWT); 
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
app.get('/privado', sessionAuth('admin'), privadoController.index);

app.locals.title = 'Nodepop';

// Middleware para tener acceso a la sesión en las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
});

/**
 * Setup de i18n
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

/**
* Conexión con la base de datos
*/
require('./lib/connectMongoose');
require('./models/Anuncio');


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
