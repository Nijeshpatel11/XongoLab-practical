const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
   
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorResponse('User already exists', 400));
    }

    
    user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
   
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

   
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

   
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
