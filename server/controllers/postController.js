const postService = require('../services/post.service');
const catchAsync = require('../utils/catchAsync');

exports.getFeed = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await postService.getFeed({ limit, offset });

  res.status(200).json({
    status: 'success',
    results: rows.length,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    data: {
      posts: rows
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
