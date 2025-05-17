const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: Buffer, // Ref outside bd
    required: false
  },
  status: {
    type: String,
    required: false
  }
})

// userSchema.virtual('coverImagePath').get(function() {
//     if (this.coverImage != null && this.coverImageType != null) {
//         return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
//     }
// })

module.exports = mongoose.model('User', userSchema)
