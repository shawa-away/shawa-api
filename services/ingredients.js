const Ingredient = require('../models/ingredient');

const ingredientService = {
  search: (params = {}) => new Promise((resolve, reject) => {
    Ingredient.find(params, (err, ingredients) => {
      if (err) return reject(err);

      resolve(ingredients)
    });
  }),

  create: (data) => new Promise((resolve, reject) => {
    const ingredient = new Ingredient(data);

    ingredient.save((err, ingredient) => {
      if (err) return reject(err);

      resolve(ingredient);
    })
  }),

  update: (id, data) => new Promise((resolve, reject) => {
    Ingredient.findByIdAndUpdate(id, data, { new: true }, (err, ingredient) => {
      if (err) return reject(err);

      resolve(ingredient);
    })
  }),

  remove: (id) => new Promise((resolve, reject) => {
    Ingredient.findByIdAndDelete(id, (err, ingredient) => {
      if (err) return reject(err);

      resolve(ingredient);
    })
  })
}


module.exports = ingredientService;