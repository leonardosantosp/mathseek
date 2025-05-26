const mongoose = require('mongoose')
const user = require('./user')

const customListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  documentId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('CustomList', listSchema, 'customLists')
