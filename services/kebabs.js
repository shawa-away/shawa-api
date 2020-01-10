const Kebab = require('../models/kebab');

const kebabService = {
  search: (params = {}) => Kebab
    .find(params)
    .populate('ingredients')
    .exec(),

  create: (data) => {
    const kebab = new Kebab(data);

    return kebab.save();
  },

  update: (id, data) => Kebab.findByIdAndUpdate(id, data, { new: true }).exec(),

  remove: (id) => Kebab.findByIdAndDelete(id).exec(),
}


module.exports = kebabService;