const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  idUser: {
    type: mongoose.Schema.Types.Object,
    ref: 'Users',
  },
  createAt: {
    type: Date,
    required: true,
  },
  updateAt: {
    type: Date,
    required: true,
  },
});

TaskSchema.index({
  name: 'text',
  description: 'text',
}, {
    weights: {
      name: 5,
      description: 1,
    },
  });

module.exports = mongoose.model('Task', TaskSchema);