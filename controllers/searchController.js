const catchAsync = require('../utils/catchAsync');
const Tweet = require('../models/tweetModel');
const User = require('../models/userModel');

const search = catchAsync(async (req, res, next) => {
  const query = req.query.q || '';
  const regexPartialQueryObject = { $regex: query, $options: 'i' };
  const tweets = await Tweet.find({
    content: regexPartialQueryObject
  });
  const users = await User.find({
    $or: [
      { name: regexPartialQueryObject },
      { username: regexPartialQueryObject },
      { bio: regexPartialQueryObject },
      { location: regexPartialQueryObject },
      { website: regexPartialQueryObject }
    ]
  });

  res.status(200).json({
    status: 'success',
    data: {
      users,
      tweets
    }
  });
});

module.exports = { search };
