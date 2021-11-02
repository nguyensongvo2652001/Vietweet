const AppError = require('../utils/appError');

const handleDuplicatedFieldError = err => {
  const duplicatedField = Object.keys(err.keyValue)[0];
  const message = `Duplicated field: ${duplicatedField}. Please try another value`;
  return new AppError(message, 400);
};

const handleValidationError = err => {
  const message = Object.values(err.errors)
    .map(obj => obj.message)
    .join('; ');
  return new AppError(message, 400);
};

const handleAPIErrorProd = (err, req, res) => {
  if (err.code === 11000) err = handleDuplicatedFieldError(err);
  if (err.name === 'ValidationError') err = handleValidationError(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

const handleRenderErrorProd = (err, req, res) => {
  return err;
};

const handleProductionError = (err, req, res) => {
  if (req.originalUrl.startsWith('/api'))
    return handleAPIErrorProd(err, req, res);
  return handleRenderErrorProd(err, req, res);
};

module.exports = handleProductionError;
