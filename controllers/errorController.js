const handleAPIErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const handleRenderErrorDev = (err, req, res) => {
  return err;
};

module.exports = (error, req, res, next) => {
  const environment = process.env.NODE_ENV;

  const errorCopy = { ...error };
  errorCopy.statusCode = error.statusCode || 500;
  errorCopy.status = error.status || 'error';
  errorCopy.message = error.message;

  if (environment === 'development') {
    if (req.originalUrl.startsWith('/api')) return handleAPIErrorDev(errorCopy);
    return handleRenderErrorDev(errorCopy);
  }
};
