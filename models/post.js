const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  photo: {  type: String },
  original: {type: String },
  location: { type: String },
  caption: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: { type: Date, default: Date.now },
  updated_at: {type: Date}
});

module.exports = mongoose.model('Post', postSchema);
