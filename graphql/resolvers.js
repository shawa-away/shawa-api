const IngredientService = require('./../services/ingredients');

module.exports = {
  Query: {
    ingredients: (root, params) => IngredientService.search()
  },
  Mutation: {
    createIngredient: (root, params) => {
      const { input } = params;

      return IngredientService.create(input)
    },
    updateIngredient: (root, params) => {
      const { id, input } = params;

      return IngredientService.update(id, input);
    },
    removeIngredient: (root, params) => {
      const { id } = params;

      return IngredientService.remove(id);
    }
  },
}