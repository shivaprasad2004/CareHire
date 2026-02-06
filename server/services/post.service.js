const { Post, User, Comment, Like } = require('../models');
const AppError = require('../utils/AppError');

class PostService {
  async createPost(postData, authorId) {
    const post = await Post.create({
      ...postData,
      authorId
    });
    return post;
  }

  async getFeed(pagination = { limit: 10, offset: 0 }) {
    const { limit, offset } = pagination;

    const posts = await Post.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'specialty', 'avatarUrl']
        },
        {
          model: Comment,
          as: 'comments',
          limit: 3, // Preview last 3 comments
          include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return posts;
  }
}

module.exports = new PostService();