const notificationService = require('../services/notification.service');
const catchAsync = require('../utils/catchAsync');

exports.getNotifications = catchAsync(async (req, res, next) => {
  const notifications = await notificationService.getUserNotifications(req.user.id);
  
  res.status(200).json({
    status: 'success',
    data: { notifications }
  });
});

exports.markAsRead = catchAsync(async (req, res, next) => {
  const { notificationId } = req.params;
  const notification = await notificationService.markAsRead(notificationId, req.user.id);
  
  res.status(200).json({
    status: 'success',
    data: { notification }
  });
});

exports.markAllAsRead = catchAsync(async (req, res, next) => {
    await notificationService.markAllAsRead(req.user.id);
    
    res.status(200).json({
        status: 'success',
        message: 'All notifications marked as read'
    });
});
