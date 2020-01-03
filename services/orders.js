const mongoose = require('mongoose');
const { Order, ORDER_STATUS } = require('../models/order');
const Ingredient = require('../models/ingredient');

const emptySort = data => data;

const ordersService = {
  search: (params = {}, isPopulated = false, sortFn = emptySort) => new Promise((resolve, reject) => {
    const { status, place, user, id } = params;
    let query = {};
    if (status) query.status = status;
    if (place) query.place = place;
    if (user) query.user = user;
    if (id) query._id = id;

    Order
      .find(query)
      .populate(isPopulated ? 'place' : null)
      .populate(isPopulated ? 'kebabs.ingredients' : null)
      .populate(isPopulated ? 'cook' : null)
      .exec((err, orders) => {
        if (err) reject(err);

        resolve(emptySort(orders))
      });
  }),

  create: (data) => new Promise((resolve, reject) => {
    const promises = data.kebabs.map(kebab => {
      return new Promise((resolve, reject) => {
        Ingredient.find({
          "_id": { $in: kebab.ingredients.map(ingredientId => mongoose.Types.ObjectId(ingredientId)) }
        }, (err, ingredients) => {
          if (err) {
            reject(err);
          }

          resolve(ingredients)
        })
      })
    });

    Promise.all(promises).then((kebabsIngredients) => {
      const price = kebabsIngredients.reduce((price, kebabIngredients) =>
        price + kebabIngredients.reduce((sum, ingredientsObj) => sum + ingredientsObj.price, 0),
        0)

      const order = new Order({ ...data, price, status: ORDER_STATUS.TODO });

      order.save((err, order) => {
        if (err) reject(err)

        resolve(order);
      })
    })
  }),

  update: (id, data) => new Promise((resolve, reject) => {
    Order.findById(id, (err, order) => {
      if (err) reject(err)

      for (key in data) {
        order[key] = data[key];
      }

      order.save((err, order) => {
        if (err) reject(err)

        resolve(order);
      })
    })
  }),

  remove: (id) => new Promise((resolve, reject) => {
    Order.findByIdAndDelete(id, (err) => {
      if (err) reject(err);

      resolve();
    })
  })
}


module.exports = ordersService;