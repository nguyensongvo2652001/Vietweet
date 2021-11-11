const handleDevelopmentError = require('./errorControllerDev');
const handleProductionError = require('./errorControllerProd');

module.exports = (error, req, res, next) => {
  const environment = process.env.NODE_ENV;

  const errorCopy = { ...error };
  errorCopy.statusCode = error.statusCode || 500;
  errorCopy.status = error.status || 'error';
  errorCopy.message = error.message;
  errorCopy.name = error.name;
  errorCopy.stack = error.stack;

  if (environment === 'development')
    return handleDevelopmentError(errorCopy, req, res);

  if (environment === 'test' || environment === 'production')
    return handleProductionError(errorCopy, req, res);
};
