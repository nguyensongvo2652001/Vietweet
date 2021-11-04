const catchAsync = require('../utils/catchAsync');

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

module.exports = { createOne };
