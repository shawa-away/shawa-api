var express = require('express');
var router = express.Router();
const Kebab = require('./../models/kebab');

router.get('/', function (req, res, next) {
  Kebab
    .find({})
    .populate('ingredients')
    .exec((err, kebabs) => {
      if (err) return next(err)

      res.json(kebabs);
    })
});

router.post('/', (req, res, next) => {
  const { body } = req;

  const kebab = new Kebab(body)

  kebab.save((err, kebab) => {
    if (err) return next(err)

    res.json(kebab);
  })
});

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  Kebab.findByIdAndUpdate(id, body, { new: true }, (err, kebab) => {
    if (err) return next(err)

    res.json(kebab);
  })
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Kebab.findByIdAndDelete(id, (err) => {
    if (err) return next(err)

    res.json({
      success: true
    })
  })
});

module.exports = router;
