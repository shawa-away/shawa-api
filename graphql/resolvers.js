const IngredientService = require('./../services/ingredients');
const PlaceService = require('./../services/places');
const UserService = require('./../services/users');
const OrderService = require('./../services/orders');
const { USER_TYPE } = require('./../models/user');
const { ORDER_STATUS } = require('./../models/order');

module.exports = {
  UserType: {
    COOK: USER_TYPE.COOK,
    ADMIN: USER_TYPE.ADMIN,
    SUPER: USER_TYPE.SUPER
  },
  OrderType: {
    TODO: ORDER_STATUS.TODO,
    IN_PROGRESS: ORDER_STATUS.IN_PROGRESS,
    DONE: ORDER_STATUS.DONE,
    FINISHED: ORDER_STATUS.FINISHED,
  },
  Query: {
    ingredients: (root, params) => IngredientService.search(),
    places: (root, params) => PlaceService.search(),
    users: (root, params) => UserService.search(params),
    orders: (root, { isPopulated = true, sortFn, ...params }) => OrderService.search(params, isPopulated, sortFn),
    nextOrder: (root, { place }) => OrderService.searchNextOrder(place)
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