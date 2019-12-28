const express = require('express');
const router = express.Router();
const Place = require('./../models/place');

router.get('/', (req, res, next) => {
  Place.find({}, (err, places) => {
    if (err) return next(err)

    res.json(places)
  })
});

router.post('/', (req, res, next) => {
  const { body } = req;

  const place = new Place(body)

  place.save((err, place) => {
    if (err) return next(err)
    
    res.json(place);
  })
});

router.put('/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  Place.findByIdAndUpdate(id, body, { new: true }, (err, place) => {
    if (err) return next(err)

    res.json(place);
  })
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Place.findByIdAndDelete(id, (err) => {
    if (err) return next(err)

    res.json({
      success: true
    })
  })
});

module.exports = router;