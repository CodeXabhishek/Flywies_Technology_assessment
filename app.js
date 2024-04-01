const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const viewRouter = require('./routers/view-router');
const userRouter = require('./routers/user-router');
const matchRouter = require('./routers/match-router');
const globalErrorHandler = require('./controllers/error-controllers');

app.use('/', viewRouter);
app.use('/user', userRouter);
app.use('/match', matchRouter);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl}`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
  //   // next(new AppError(`Can't find ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
