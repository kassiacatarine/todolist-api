const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const tokenBearer = req.header('Authorization');
    if (!tokenBearer) {
      throw new Error('Not authorized to access this resource.');
    }
    const token = tokenBearer.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET);

    const now = parseInt(new Date().getTime() / 1000, 10);
    if (decoded.exp <= now) {
      throw new Error('Token expired.');
    }

    const user = await User.findById(decoded.id);
    if (!user || user.email !== decoded.email) {
      throw new Error('Invalid id or email in token.');
    }

    next();
  } catch (err) {
    res.status(401).json({
      errors: [{
        title: 'Authorization Token Error',
        detail: 'Something went wrong during token authorization process.',
        errorMessage: err.message,
      }],
    });
  }
};

module.exports = auth;