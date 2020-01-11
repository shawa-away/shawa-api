const User = require('../models/user');

const userService = {
  search: (query = {}) => User
    .find(query)
    .populate('place')
    .exec(),

  create: data => {
    const user = new User(data);

    return user
      .save()
      .then(user => user.populate('place').execPopulate())
  },

  update: (id, data) => User
    .findByIdAndUpdate(id, data)
    .exec()
    .then(user => user.populate('place').execPopulate()),

  remove: id => User.findByIdAndDelete(id).exec(),
}


module.exports = userService;