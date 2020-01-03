const Kebab = require('../models/kebab');

const ingredientService = {
  search: (params = {}) => new Promise((resolve, reject) => {
    Kebab
      .find(params)
      .populate('ingredients')
      .exec((err, kebabs) => {
        if (err) reject(err);

        resolve(kebabs)
      });
  }),

  create: (data) => new Promise((resolve, reject) => {
    const kebab = new Kebab(data);

    kebab.save((err, kebab) => {
      if (err) reject(err);

      resolve(kebab);
    })
  }),

  update: (id, data) => new Promise((resolve, reject) => {
    Kebab.findByIdAndUpdate(id, data, { new: true }, (err, kebab) => {
      if (err) reject(err);

      resolve(kebab);
    })
  }),

  remove: (id) => new Promise((resolve, reject) => {
    Kebab.findByIdAndDelete(id, (err) => {
      if (err) reject(err);

      resolve();
    })
  })
}


module.exports = ingredientService;