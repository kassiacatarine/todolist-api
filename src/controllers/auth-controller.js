const User = require('../models/user');
const Validators = require('../utils/validators');
const userController = require('./user-controller');

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    if (!Validators.isEmail(email)) {
      throw new Error('Email must be a valid email address.');
    }
    if (typeof password !== 'string') {
      throw new Error('Password must be a string.');
    }
    if (await userController.validateEmailAccessibility(email)) {
      throw new Error('The email must be a unique address.');
    }
    const user = new User({ name, email });
    user.setPassword(password);
    await user.save();

    res.status(201).json({
      title: 'User Registration Successful',
      detail: 'Successfully registered new user',
    });
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Registration Error',
        detail: 'Something went wrong during registration process.',
        errorMessage: err.message,
      }],
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;
    if (!Validators.isEmail(email)) {
      return res.status(400).json({
        errors: [{
          title: 'Bad Request',
          detail: 'Email must be a valid email address',
        }],
      });
    }
    if (typeof password !== 'string') {
      return res.status(400).json({
        errors: [{
          title: 'Bad Request',
          detail: 'Password must be a string',
        }],
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error();
    }

    const passwordValidated = user.validatePassword(password);
    if (!passwordValidated) {
      throw new Error();
    }

    res.json({
      title: 'Login Successful',
      detail: 'Successfully validated user credentials',
      userAuth: user.toAuthJSON(),
    });
  } catch (err) {
    res.status(401).json({
      errors: [{
        title: 'Invalid Credentials',
        detail: 'Check email and password combination',
        errorMessage: err.message,
      }],
    });
  }
};