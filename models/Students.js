const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  subject: {
      type: Array,
      required: true
  }
});

module.exports = mongoose.model('Student', eventSchema);