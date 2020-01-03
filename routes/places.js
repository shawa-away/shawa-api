const express = require('express');
const router = express.Router();
const PlaceService = require('./../services/places');

router.get('/', (req, res, next) => {
  PlaceService
    .search()
    .then(places => res.json(places))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const { body } = req;

  PlaceService
    .create(body)
    .then(place => res.json(place))
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  PlaceService
    .update(id, body)
    .then(place => res.json(place))
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  PlaceService
    .remove(id)
    .then(() => res.json({}))
    .catch(err => next(err));
});

module.exports = router;