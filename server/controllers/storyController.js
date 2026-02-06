const storyService = require('../services/story.service');
const catchAsync = require('../utils/catchAsync');

exports.getActiveStories = catchAsync(async (req, res, next) => {
  const stories = await storyService.getActiveStories();
  res.status(200).json({
    status: 'success',
    results: stories.length,
    data: { stories }
  });
});

exports.createStory = catchAsync(async (req, res, next) => {
  const story = await storyService.createStory(req.body, req.user.id);
  res.status(201).json({
    status: 'success',
    data: { story }
  });
});
