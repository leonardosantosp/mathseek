const mongoose = require('mongoose')
const user = require('./user')

const preferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  background: {
    type: Buffer,
    required: false
  },
  font: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Preference', preferenceSchema)
