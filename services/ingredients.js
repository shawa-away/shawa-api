const Ingredient = require('../models/ingredient');

const ingredientService = {
  search: (params = {}) => Ingredient.find(params).exec(),

  create: (data) => {
    const ingredient = new Ingredient(data);

    return ingredient.save();
  },

  update: (id, data) => Ingredient.findByIdAndUpdate(id, data, { new: true }).exec(),

  remove: (id) => Ingredient.findByIdAndDelete(id).exec(),
}


module.exports = ingredientService;