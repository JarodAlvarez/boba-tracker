var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');


const apiSpec = path.join(__dirname, './api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));
app.listen(3010, () => {
  console.log("server is listening on 3010");
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*
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
*/

//get all bobas
app.get('/v0/boba', indexRouter.getAll);

//get a boba
app.get('/v0/boba/:boba_id', indexRouter.getOne);

//create a boba
app.post('/v0/boba', indexRouter.post);

//update a boba
app.put('/v0/boba', indexRouter.update);
//delete a boba
app.delete('/v0/boba/:boba_id', indexRouter.del);

module.exports = app;
