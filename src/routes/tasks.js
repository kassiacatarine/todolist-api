const express = require('express');

const router = express.Router();
const taskController = require('../controllers/task-controller');
const auth = require('../midlewares/auth');

router
  .get('/', taskController.tasks)
  .post('/', taskController.new)
  .get('/:id', taskController.task)
  .put('/:id', taskController.update)
  .delete('/:id', taskController.delete);

module.exports = router;
