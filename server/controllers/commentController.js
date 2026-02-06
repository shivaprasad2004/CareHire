const commentService = require('../services/comment.service');
const catchAsync = require('../utils/catchAsync');

exports.addComment = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { content } = req.body;
  
  const comment = await commentService.addComment(req.user.id, postId, content);
  
  res.status(201).json({
    status: 'success',
    data: { comment }
  });
});

exports.getComments = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const comments = await commentService.getPostComments(postId);
  
  res.status(200).json({
    status: 'success',
    data: { comments }
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    const { commentId } = req.params;
    await commentService.deleteComment(commentId, req.user.id, req.user.role);
    
    res.status(204).json({
        status: 'success',
        data: null
    });
});
