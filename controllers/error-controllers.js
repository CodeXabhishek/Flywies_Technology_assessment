const AppError = require('./../utils/app-error');
const sendErrorDevelopment = (err, req, res) => {
  if (req.originalUrl.startsWith('/')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      stack: err.stack,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
};
module.exports = (err, req, res, next) => {
  console.log('abhi');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  sendErrorDevelopment(err, req, res);
};
