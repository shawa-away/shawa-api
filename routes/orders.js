var express = require('express');
var router = express.Router();
const { ORDER_STATUS } = require('./../models/order');
const OrdersService = require('./../services/orders');

router.get('/', function (req, res, next) {
  OrdersService
    .search(req.query)
    .then(orders => res.json(orders))
    .catch(err => next(err));
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

  const sortFn = orders => orders.slice().sort((a, b) => a.time - b.time);

  OrdersService
    .search({ place, status: ORDER_STATUS.TODO }, true, sortFn)
    .then(orders => res.json(orders.length ? orders[0] : {}))
    .catch(err => next(err));
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;

  OrdersService
    .search(id, true)
    .then(orders => res.json(orders.length ? orders[0] : {}))
    .catch(err => next(err));
});


router.post('/', (req, res, next) => {
  const { body } = req;

  OrdersService
    .create(body)
    .then(order => res.json(order))
    .catch(err => next(err));
})

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  OrdersService
    .update(id, body)
    .then(order => res.json(order))
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  OrdersService
    .remove(id)
    .then(() => res.json({}))
    .catch(err => next(err));
});

module.exports = router;
