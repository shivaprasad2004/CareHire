const searchService = require('../services/search.service');
const catchAsync = require('../utils/catchAsync');

exports.search = catchAsync(async (req, res) => {
  const { q, type } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  const results = await searchService.search(q, type, { limit, offset });
  if (req.user) {
    await searchService.saveSearch(req.user.id, q, type);
  }
  res.status(200).json({ status: 'success', data: results });
});

exports.getSuggestions = catchAsync(async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) {
    return res.status(200).json({ status: 'success', data: { users: [], jobs: [], organizations: [] } });
  }
  const suggestions = await searchService.getSuggestions(q);
  res.status(200).json({ status: 'success', data: suggestions });
});

exports.getSearchHistory = catchAsync(async (req, res) => {
  const history = await searchService.getSearchHistory(req.user.id);
  res.status(200).json({ status: 'success', data: { history } });
});

exports.clearSearchHistory = catchAsync(async (req, res) => {
  const result = await searchService.clearSearchHistory(req.user.id);
  res.status(200).json({ status: 'success', data: result });
});
