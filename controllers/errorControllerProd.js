const AppError = require('../utils/appError');

const handleDuplicatedFieldError = err => {
  const duplicatedField = Object.keys(err.keyValue)[0];
  const message = `Duplicated field: ${duplicatedField}. Please try another value`;
  return new AppError(message, 400);
};

const handleCastError = err => {
  const message = `Invalid id: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationError = err => {
  const message = Object.values(err.errors)
    .map(obj => {
      if (obj.name === 'CastError') return `Invalid id: ${obj.value}`;
      return obj.message;
    })
    .join('; ');
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () => new AppError('Invalid JsonWebToken', 400);

const handleExpiredTokenError = () => new AppError('Expired JsonWebToken', 400);

const handleAPIErrorProd = (err, req, res) => {
  if (err.code === 11000) err = handleDuplicatedFieldError(err);
  if (err.name === 'ValidationError') err = handleValidationError(err);
  if (err.name === 'JsonWebTokenError') err = handleJsonWebTokenError();
  if (err.name === 'TokenExpiredError') err = handleExpiredTokenError();
  if (err.name === 'CastError') err = handleCastError(err);
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
