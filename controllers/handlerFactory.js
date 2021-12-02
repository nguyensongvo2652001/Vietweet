const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObject = require('../utils/filterObject');

const getAll = (Model, docsName) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find(req.filterQuery);

    res.status(200).json({
      status: 'success',
      data: {
        length: docs.length,
        [docsName]: docs
      }
    });
  });

const getOne = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc)
      return next(
        new AppError(`No ${docName} was found with id = ${req.params.id}`, 404)
      );

    res.status(200).json({
      status: 'success',
      data: {
        [docName]: doc
      }
    });
  });

const createOne = (Model, docName, whiteList = [], populateOptions) =>
  catchAsync(async (req, res, next) => {
    req.body =
      whiteList.length > 0 ? filterObject(req.body, ...whiteList) : req.body;
    let document = await Model.create(req.body);
    if (populateOptions) {
      document = await Model.findById(document.id).populate(populateOptions);
    }
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

module.exports = { getAll, getOne, createOne, deleteOne };
