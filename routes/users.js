const express = require('express');
const router = express.Router();
const UserService = require('./../services/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  const { place } = req.query;
  const query = {};

  if (place) query.place = place;

  UserService
    .search(query)
    .then(users => res.json(users))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const { body } = req;

  UserService
    .create(body)
    .then(user => res.json(user))
    .catch(err => next(err));
})

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  UserService
    .update(id, body)
    .then(user => res.json(user))
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  UserService
    .remove(id)
    .then(() => res.json({}))
    .catch(err => next(err));
});

module.exports = router;
