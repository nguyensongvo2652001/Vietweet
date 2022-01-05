const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/userModel');
const handlerFactory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObject = require('../utils/filterObject');

const getUser = handlerFactory.getOne(User, 'user');

const storage = multer.memoryStorage();
const fileFilter = function(req, file, cb) {
  const fileType = file.mimetype.split('/')[0];
  const { fieldname } = file;
  if (fileType !== 'image')
    return cb(
      new AppError(
        `${fieldname} must be an image. Please try another file`,
        400
      ),
      false
    );
  cb(null, true);
};
const upload = multer({ storage, fileFilter });

const uploadImages = upload.fields([
  {
    name: 'avatar',
    maxCount: 1
  },
  {
    name: 'background',
    maxCount: 1
  }
]);

const resizeAndStoreAvatar = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  const { avatar } = req.files;
  if (!avatar) return next();
  req.body.avatar = `user_${req.user.id}_avatar.jpg`;
  await sharp(avatar[0].buffer)
    .resize(500, 500)
    .jpeg({ quality: 80 })
    .toFile(`public/img/users/avatars/${req.body.avatar}`);

  next();
});

const resizeAndStoreBackground = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  const { background } = req.files;
  if (!background) return next();

  req.body.background = `user_${req.user.id}_background.jpg`;
  await sharp(background[0].buffer)
    .jpeg({ quality: 80 })
    .toFile(`public/img/users/backgrounds/${req.body.background}`);

  next();
});

const updateMe = catchAsync(async (req, res, next) => {
  req.body = filterObject(
    req.body,
    'name',
    'bio',
    'location',
    'website',
    'dateOfBirth',
    'avatar',
    'background'
  );

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

module.exports = {
  getUser,
  updateMe,
  uploadImages,
  resizeAndStoreAvatar,
  resizeAndStoreBackground
};
