const { Post, User } = require('../models');

exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'role', 'organization', 'avatarUrl', 'isVerified']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching feed' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, title, category, imageUrl } = req.body;

    const newPost = await Post.create({
      content,
      title,
      category,
      imageUrl,
      userId: req.user.id
    });

    // Fetch the post again to include author details
    const postWithAuthor = await Post.findByPk(newPost.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'role', 'organization', 'avatarUrl', 'isVerified']
        }
      ]
    });

    res.status(201).json(postWithAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating post' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Simple increment for now (in real app, track user likes in a join table)
    post.likesCount += 1;
    await post.save();

    res.json({ message: 'Post liked', likesCount: post.likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
