const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kebabSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true }]
});

const Kebab = mongoose.model('Kebab', kebabSchema);

module.exports = Kebab;