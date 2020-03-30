const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean
  },
  type: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;