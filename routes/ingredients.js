var express = require('express');
var router = express.Router();
const Ingredient = require('../models/ingredient');

router.get('/', (req, res, next) => {
  Ingredient.find({}, (err, ingredients) => {
    if (err) return next(err)

    res.json(ingredients)
  })
});

router.post('/', (req, res, next) => {
  const { body } = req;

  const ingredient = new Ingredient(body)

  ingredient.save((err, ingredient) => {
    if (err) return next(err)

    res.json(ingredient);
  })
});

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  Ingredient.findByIdAndUpdate(id, body, { new: true }, (err, ingredient) => {
    if (err) return next(err)

    res.json(ingredient);
  })
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Ingredient.findByIdAndDelete(id, (err) => {
    if (err) return next(err)

    res.json({
      success: true
    })
  })
});

module.exports = router;
