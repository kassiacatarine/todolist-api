const express = require('express');

const router = express.Router();
const taskController = require('../controllers/task-controller');
const auth = require('../midlewares/auth');

router
  .get('/', auth, taskController.tasks)
  .post('/', auth, taskController.new)
  .get('/:id', auth, taskController.task)
  .put('/:id', auth, taskController.update)
  .delete('/:id', auth, taskController.delete);

module.exports = router;
