var express = require('express');
var router = express.Router();
const IngredientService = require('../services/ingredients');

router.get('/', (req, res, next) => {
  IngredientService
    .search()
    .then(ingredients => res.json(ingredients))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const { body } = req;

  IngredientService
    .create(body)
    .then(ingredients => res.json(ingredients))
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  IngredientService
    .update(id, body)
    .then(ingredients => res.json(ingredients))
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  IngredientService
    .remove(id)
    .then(() => res.json({}))
    .catch(err => next(err));
});

module.exports = router;
