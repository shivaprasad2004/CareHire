const { Comment, User } = require('../models');
const AppError = require('../utils/AppError');

class CommentService {
  async addComment(userId, postId, content) {
    const comment = await Comment.create({
      authorId: userId,
      postId,
      content
    });

    const fullComment = await Comment.findByPk(comment.id, {
        include: [
            { model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'avatarUrl'] }
        ]
    });

    return fullComment;
  }

  async getPostComments(postId, limit = 50, offset = 0) {
    return await Comment.findAll({
      where: { postId },
      order: [['createdAt', 'ASC']], // Comments usually chronological
      limit,
      offset,
      include: [
        { model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'avatarUrl'] }
      ]
    });
  }
  
  async deleteComment(commentId, userId, userRole) {
      const comment = await Comment.findByPk(commentId);
      if (!comment) throw new AppError('Comment not found', 404);
      
      if (comment.authorId !== userId && userRole !== 'admin') {
          throw new AppError('Not authorized to delete this comment', 403);
      }
      
      await comment.destroy();
      return { message: 'Comment deleted' };
  }
}

module.exports = new CommentService();
