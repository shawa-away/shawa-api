var express = require('express');
var router = express.Router();
const KebabService = require('../services/kebabs');

router.get('/', function (req, res, next) {
  KebabService
    .search()
    .then(kebabs => res.json(kebabs))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const { body } = req;

  KebabService
    .create(body)
    .then(kebab => res.json(kebab))
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  KebabService
    .update(id, body)
    .then(kebab => res.json(kebab))
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  KebabService
    .remove(id)
    .then(() => res.json({}))
    .catch(err => next(err));
});

module.exports = router;
