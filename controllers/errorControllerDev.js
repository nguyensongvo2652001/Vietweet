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

const handleDevelopmentError = (err, req, res) => {
  if (req.originalUrl.startsWith('/api'))
    return handleAPIErrorDev(err, req, res);
  return handleRenderErrorDev(err, req, res);
};

module.exports = handleDevelopmentError;
