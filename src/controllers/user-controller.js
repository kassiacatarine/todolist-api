const User = require('../models/user');

exports.users = async (req, res) => {
  try {
    const users = await User.find();

    res.status(201).json(users);
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Find Users Error',
        detail: 'Something went wrong during find users process.',
        errorMessage: err.message,
      }],
    });
  }
};

exports.validateEmailAccessibility = async (email) => {
  const result = await User.findOne({ email });
  return result !== null;
};

exports.deleteMany = async (req, res) => {
  try {
    const users = await User.deleteMany();

    res.status(204).json(users);
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Delete Users Error',
        detail: 'Something went wrong during delete users process.',
        errorMessage: err.message,
      }],
    });
  }
};