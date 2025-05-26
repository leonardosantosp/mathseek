const mongoose = require('mongoose')
const user = require('./user')

const searchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  documentId: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model(
  'SearchHistory',
  searchHistorySchema,
  'searchHistories'
)
