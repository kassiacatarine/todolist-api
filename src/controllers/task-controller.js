const Video = require('../models/video');

exports.new = async (req, res) => {
  try {
    const {
      name,
      idUser,
    } = req.body;

    if (!name) {
      throw new Error('Name must be a valid name.');
    }
    if (!idUser) {
      throw new Error('idUser must be a valid user object.');
    }

    const task = new Task({
      name,
      idUser,
      createAt: new Date(),
      uploadAt: new Date()
    });

    await task.save();

    res.status(201).json({
      title: 'Task Successfully Created',
      detail: 'Successfully created new task',
    });
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Error Creating Task',
        detail: 'Something went wrong during creating task process.',
        errorMessage: err.message,
      }],
    });
  }
};

exports.update = async (req, res) => {
  try {

    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      throw new Error('Task must be a valid object.');
    }

    const {
      name,
      description,
      idUser
    } = req.body;

    if (!name) {
      throw new Error('Name must be a valid name.');
    }
    if (!idUser) {
      throw new Error('idUser must be a valid user object.');
    }

    await Task.findByIdAndUpdate(req.params.id, req.body)

    res.status(201).json({
      title: 'Task Successfully Created',
      detail: 'Successfully created new task',
    });
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Error Creating Task',
        detail: 'Something went wrong during creating task process.',
        errorMessage: err.message,
      }],
    });
  }
};

exports.tasks = async (req, res) => {
  try {
    const { search } = req.query;

    const tasks = search === undefined ? await Task.find() : await Task.find({ $text: { $search: search, $caseSensitive: false } });

    res.status(201).json(tasks);
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Error Getting Tasks',
        detail: 'Something went wrong during getting tasks process.',
        errorMessage: err.message,
      }],
    });
  }
};

exports.task = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      throw new Error('Task must be a valid object.');
    }

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Error Getting Task',
        detail: 'Something went wrong during getting task process.',
        errorMessage: err.message,
      }],
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      throw new Error('Task must be a valid object.');
    }

    await Task.findByIdAndRemove(id);

    res.status(204).json({
      title: 'Task Successfully Removed',
      detail: 'Successfully removed task',
    });
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Error Removing Task',
        detail: 'Something went wrong during removing task process.',
        errorMessage: err.message,
      }],
    });
  }
};