const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const USER_TYPE = {
  COOK: 'cook',
  ADMIN: 'admin',
  SUPER: 'super',
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [USER_TYPE.COOK, USER_TYPE.ADMIN, USER_TYPE.SUPER],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    // TODO: add uniq fields only
  },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  USER_TYPE
};