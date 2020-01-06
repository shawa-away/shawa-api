const User = require('../models/user');

const userService = {
  search: (query = {}) => new Promise((resolve, reject) => {
    User
      .find(query)
      .populate('place')
      .exec((err, users) => {
        if (err) return reject(err);

        resolve(users)
      });
  }),

  create: (data) => new Promise((resolve, reject) => {
    const user = new User(data);


    user.save((err, user) => {
      if (err) return reject(err);


      user.populate('place', (err, user) => resolve(user))
    })
  }),

  update: (id, data) => new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, data, { new: true }, (err, user) => {
      if (err) return reject(err);

      user.populate('place', (err, user) => resolve(user))
    })
  }),

  remove: (id) => new Promise((resolve, reject) => {
    User.findByIdAndDelete(id, (err, user) => {
      if (err) return reject(err);

      resolve(user);
    })
  })
}


module.exports = userService;