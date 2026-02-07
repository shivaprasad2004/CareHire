class BaseController {
  constructor(service) {
    this.service = service;
    this.handleServiceCall = this.handleServiceCall.bind(this);
  }

  async handleServiceCall(serviceMethod, req, res, next) {
    try {
      const result = await serviceMethod(req, res);
      
      if (result && result.statusCode) {
        return res.status(result.statusCode).json({
          status: result.status || 'success',
          ...result.data
        });
      }
      
      return res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  extractPagination(req) {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    
    return { page, limit, offset };
  }

  extractUserId(req) {
    return req.user?.id;
  }

  extractUserRole(req) {
    return req.user?.role;
  }

  validateRequiredBody(req, requiredFields) {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
      error.statusCode = 400;
      throw error;
    }
  }
}

module.exports = BaseController;