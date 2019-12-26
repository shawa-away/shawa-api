const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  time: {
    type: String
  },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  kebabs: [{ ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true }] }],
  phone: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'done', 'delivered'],
    required: true,
  },
  cook: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doneTime: {
    type: String,
  },
  comments: String
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;