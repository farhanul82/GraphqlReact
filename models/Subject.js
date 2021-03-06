const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  student: {
    type: Array,
},
});

module.exports = mongoose.model('Subject', eventSchema);