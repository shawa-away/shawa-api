var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const User = require('./../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const { place } = req.query;
  const query = {};

  if (place) query.place = place;

  User
    .find(query)
    .populate('place')
    .exec((err, users) => {
      if (err) {
        res.status(500).json({ error: true, message: 'Something wrong' });
      }

      res.json(users)
    })
});

router.post('/', (req, res, next) => {
  const { body } = req;

  const user = new User(body);

  user.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(user);
  })
})

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  User.findByIdAndUpdate(id, body, { new: true }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json(user);
  })
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id, (err) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({
      success: true
    })
  })
});

module.exports = router;
