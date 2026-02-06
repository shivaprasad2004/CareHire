const likeService = require('../services/like.service');
const catchAsync = require('../utils/catchAsync');

exports.toggleLike = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const result = await likeService.toggleLike(req.user.id, 'post', postId);
  
  res.status(200).json({
    status: 'success',
    data: result
  });
});

exports.getLikes = catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    const count = await likeService.getLikes(postId);
    
    res.status(200).json({
        status: 'success',
        data: { count }
    });
});
