const IngredientService = require('./../services/ingredients');
const PlaceService = require('./../services/places');
const UserService = require('./../services/users');
const OrderService = require('./../services/orders');
const { ORDER_STATUS } = require('./../models/order');

module.exports = {
  UserType: {
    COOK: 'cook',
    ADMIN: 'admin',
    SUPER: 'super'
  },
  OrderType: {
    TODO: 'todo',
    IN_PROGRESS: 'inprogress',
    DONE: 'done',
    FINISHED: 'finished',
  },
  Query: {
    ingredients: (root, params) => IngredientService.search(),
    places: (root, params) => PlaceService.search(),
    users: (root, params) => UserService.search(params),
    orders: (root, { isPopulated = true, sortFn, ...params }) => OrderService.search(params, isPopulated, sortFn),
    nextOrder: (root, { isPopulated = true, place }) => {
      const sortFn = orders => orders.slice().sort((a, b) => a.time - b.time);
      return OrderService
        .search({ place, status: ORDER_STATUS.TODO }, isPopulated, sortFn)
        .then(orders => orders.length ? orders[0] : {});
    }
  },
  Mutation: {
    // Ingredients
    createIngredient: (root, { input }) => IngredientService.create(input),
    updateIngredient: (root, { id, input }) => IngredientService.update(id, input),
    removeIngredient: (root, { id }) => IngredientService.remove(id),
    // Places
    createPlace: (root, { input }) => PlaceService.create(input),
    updatePlace: (root, { id, input }) => PlaceService.update(id, input),
    removePlace: (root, { id }) => PlaceService.remove(id),
    // Users
    createUser: (root, { input }) => UserService.create(input),
    updateUser: (root, { id, input }) => UserService.update(id, input),
    removeUser: (root, { id }) => UserService.remove(id),
    // Orders
    createOrder: (root, { input }) => OrderService.create(input),
    updateOrder: (root, { id, input }) => OrderService.update(id, input),
    removeOrder: (root, { id }) => OrderService.remove(id),
  },
}