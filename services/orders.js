const mongoose = require('mongoose');
const { Order, ORDER_STATUS } = require('../models/order');
const Ingredient = require('../models/ingredient');

const emptySort = data => data;
const timeSortFn = items => items.slice().sort((a, b) => a.time - b.time);

const ordersService = {
  search: (params = {}, isPopulated = false, sortFn = emptySort) => {
    const { status, place, user, id, _id } = params;
    let query = {};
    if (status) query.status = status;
    if (place) query.place = place;
    if (user) query.user = user;
    if (id || _id) query._id = id || _id;

    return Order
      .find(query)
      .populate(isPopulated ? 'place' : null)
      .populate(isPopulated ? 'kebabs.ingredients' : null)
      .populate(isPopulated ? 'cook' : null)
      .exec()
      .then(orders => sortFn(orders));
  },

  searchNextOrder: place => {
    if (!place) {
      return Promise.reject(new Error('missing Place'));
    }

    return ordersService
      .search({ place, status: ORDER_STATUS.TODO }, true)
      .then(orders => timeSortFn(orders))
      .then(orders => orders.length ? orders[0] : null)
  },

  create: data => {
    if (!data.kebabs || !data.kebabs.length) {
      return Promise.reject(new Error('missing Data'))
    };

    const ingredients = data.kebabs.map(
      kebab => Ingredient
        .find({
          "_id": { $in: kebab.ingredients.map(ingredientId => mongoose.Types.ObjectId(ingredientId)) }
        })
        .exec()
    );

    return Promise.all(ingredients)
      .then((kebabsIngredients) => {
        return kebabsIngredients.reduce((price, kebabIngredients) =>
          price + kebabIngredients.reduce((sum, ingredientsObj) => sum + ingredientsObj.price, 0),
          0);
      })
      .then(price => new Order({ ...data, price, status: ORDER_STATUS.TODO }))
      .then(order => order
        .save()
        .then(order =>
          order
            .populate('place kebabs.ingredients')
            .execPopulate()
        )
      );
  },

  update: (id, data) => Order
    .findById(id)
    .exec()
    .then(order => {
      for (key in data) {
        order[key] = data[key];
      }

      return order.save();
    })
    .then(order => order.populate('place kebabs.ingredients cook').execPopulate()),

  remove: (id) => Order.findByIdAndDelete(id).exec()
}


module.exports = ordersService;