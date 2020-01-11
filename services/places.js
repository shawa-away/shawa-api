const Place = require('../models/place');

const placeService = {
  search: (query = {}) => Place
    .find(query)
    .exec(),

  create: (data) => {
    const place = new Place(data);

    return place.save();
  },

  update: (id, data) => Place.findByIdAndUpdate(id, data, { new: true }),

  remove: (id) => Place.findByIdAndDelete(id),
}


module.exports = placeService;