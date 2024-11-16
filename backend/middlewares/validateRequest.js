const ErrorResponse = require('../utils/errorResponse');

const validateRequest = (req, res, next) => {
  const { name, email, password } = req.body;

  
  if (req.path === '/register') {
    if (!name || !email || !password) {
      return next(new ErrorResponse('Please provide name, email, and password', 400));
    }
  }

  
  if (req.path === '/login') {
    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password', 400));
    }
  }

  next();
};

module.exports = validateRequest;
