var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Order = require('./../models/order');
const Ingredient = require('../models/ingredient');

router.get('/', function (req, res, next) {
  const { status, place, user } = req.query;
  let query = {};
  if (status) query.status = status;
  if (place) query.place = place;
  if (user) query.user = user;

  Order
    .find(query)
    .populate('place')
    .populate('kebabs.ingredients')
    .populate('cook')
    .exec((err, orders) => {
      if (err) {
        res.status(500).json({ error: true, message: 'Something wrong' });
      }

      res.json(orders)
    })
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;

  Order
    .findById(id)
    .populate('place')
    .populate('kebabs.ingredients')
    .populate('cook')
    .exec((err, order) => {
      if (err) {
        res.status(500).json({ error: true, message: 'Something wrong' });
      }

      res.json(order)
    })
});


router.post('/', (req, res, next) => {
  const { body } = req;

  const promises = body.kebabs.map(kebab => {
    return new Promise((resolve, reject) => {
      Ingredient.find({
        "_id": { $in: kebab.ingredients.map(ingredientId => mongoose.Types.ObjectId(ingredientId)) }
      }, (err, ingredients) => {
        if (err) {
          reject(err);
        }

        resolve(ingredients)
      })
    })
  });

  Promise.all(promises).then((kebabsIngredients) => {
    const price = kebabsIngredients.reduce((price, kebabIngredients) =>
      price + kebabIngredients.reduce((sum, ingredientsObj) => sum + ingredientsObj.price, 0),
      0)

    const order = new Order({ ...body, price, status: 'todo' });

    order.save((err, order) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(order);
    })
  })
})

// NEXT STATUS ROUTER
router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  Order.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, order) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json(order);
  })
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Order.findByIdAndDelete(id, (err) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({
      success: true
    })
  })
});

module.exports = router;
