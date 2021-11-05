const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const createOne = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        [docName]: document
      }
    });
  });

const deleteOne = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document)
      return next(
        new AppError(`No ${docName} was found with id = ${req.params.id}`, 404)
      );

    res.status(204).json({
      status: 'success'
    });
  });

module.exports = { createOne, deleteOne };
