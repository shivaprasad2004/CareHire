const postService = require('../services/post.service');
const catchAsync = require('../utils/catchAsync');

exports.getFeed = catchAsync(async (req, res, next) => {
  const posts = await postService.getFeed(req.query);
  res.status(200).json({
    status: 'success',
    results: posts.count,
    data: {
      posts: posts.rows
    }
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await postService.createPost(req.body, req.user.id);
  res.status(201).json({
    status: 'success',
    data: {
      post
    }
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const result = await postService.likePost(req.params.id, req.user.id);
  res.status(200).json({
    status: 'success',
    data: {
      liked: result.liked,
      likesCount: result.likesCount
    }
  });
});
