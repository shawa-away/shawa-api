const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ValidationError = mongoose.Error.ValidationError;
const ValidatorError = mongoose.Error.ValidatorError;

const ORDER_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'inprogress',
  DONE: 'done',
  FINISHED: 'finished',
}

const orderSchema = new Schema({
  time: {
    type: Date,
    required: true
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
    required: true,
  },
  status: {
    type: String,
    enum: [ORDER_STATUS.TODO, ORDER_STATUS.IN_PROGRESS, ORDER_STATUS.DONE, ORDER_STATUS.FINISHED],
    required: true,
  },
  cook: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doneTime: {
    type: Date,
  },
  comments: String
}, { timestamps: true });

orderSchema.pre('save', function (next) {

  if (!this.kebabs || (this.kebabs && this.kebabs.length === 0)
    || this.kebabs.some(kebabs => kebabs.ingredients && kebabs.ingredients.length === 0)) {
    return next(new Error('Kebabs should be not empty in order'));
  }

  if (this.status !== ORDER_STATUS.TODO && !this.cook) {
    // const error = new ValidationError(this);
    // error.errors.cook = new ValidatorError({
    //   path: 'cook',
    //   message: 'Cook may be empty only in TODO status',
    //   type: 'notvalid',
    //   value: this.cook
    // });

    // console.log(error)
    const error = new Error('Cook may be empty only in TODO status')

    return next(error);
  }

  next();
})

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Order,
  ORDER_STATUS
};