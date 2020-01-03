const Place = require('../models/place');

const placeService = {
  search: (query = {}) => new Promise((resolve, reject) => {
    Place
      .find(query)
      .exec((err, places) => {
        if (err) reject(err);

        resolve(places)
      });
  }),

  create: (data) => new Promise((resolve, reject) => {
    const place = new Place(data);

    place.save((err, place) => {
      if (err) reject(err);

      resolve(place);
    })
  }),

  update: (id, data) => new Promise((resolve, reject) => {
    Place.findByIdAndUpdate(id, data, { new: true }, (err, place) => {
      if (err) reject(err);

      resolve(place);
    })
  }),

  remove: (id) => new Promise((resolve, reject) => {
    Place.findByIdAndDelete(id, (err) => {
      if (err) reject(err);

      resolve();
    })
  })
}


module.exports = placeService;