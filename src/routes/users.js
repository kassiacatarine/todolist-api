const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../midlewares/auth');

router
  .get('/', auth, userController.users)
  .delete('/', auth, userController.deleteMany);

module.exports = router;
