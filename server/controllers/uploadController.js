const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.uploadFile = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload a file', 400));
  }
  
  // Construct the URL
  // We will serve 'public' folder statically.
  // The file is in public/uploads/filename
  
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.get('host');
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  
  res.status(200).json({
    status: 'success',
    data: {
      url: fileUrl
    }
  });
});
