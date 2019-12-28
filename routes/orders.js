var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { Order, ORDER_STATUS } = require('./../models/order');
const Ingredient = require('../models/ingredient');

router.get('/', function (req, res, next) {
  const { status, place, user } = req.query;
  let query = {};
  if (status) query.status = status;
  if (place) query.place = place;
  if (user) query.user = user;

  Order
    .find(query)
    // .populate('place')
    // .populate('kebabs.ingredients')
    // .populate('cook')
    .exec((err, orders) => {
      if (err) return next(err)

      res.json(orders)
    })
});

router.get('/next', function (req, res, next) {
  const { place } = req.query;

  if (!place) {
    return next({
      status: 400,
      error: true,
      message: 'Place should be defined'
    });
  }

  Order
    .find({ place, status: ORDER_STATUS.TODO })
    .populate('place')
    .populate('kebabs.ingredients')
    .exec(function (err, orders) {
      if (err) return next(err);

      const sortedOrders = orders.slice().sort((a, b) => a.time - b.time);
      const nextOrder = sortedOrders.length ? sortedOrders[0] : {};

      res.json(nextOrder);
    });
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;

  Order
    .findById(id)
    .populate('place')
    .populate('kebabs.ingredients')
    .populate('cook')
    .exec((err, order) => {
      if (err) return next(err)

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

    const order = new Order({ ...body, price, status: ORDER_STATUS.TODO });

    order.save((err, order) => {
      if (err) return next(err)

      res.json(order);
    })
  })
})

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  Order.findById(id, (err, order) => {
    if (err) return next(err)

    for (key in body) {
      order[key] = body[key];
    }

    order.save((err, order) => {
      if (err) return next(err)

      res.json(order);
    })
  })
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Order.findByIdAndDelete(id, (err) => {
    if (err) return next(err)

    res.json({
      success: true
    })
  })
});

module.exports = router;
