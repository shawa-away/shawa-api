const OrdersService = require('./orders');
const PlacesService = require('./places');
const IngredientsService = require('./ingredients');
const { Order } = require('../models/order');
const DBTestHelper = require('./../tests/helpers/connection');

// Register models that need to populate
require('../models/place');
require('../models/user');
require('../models/ingredient');

const getIngredientIds = ingredients => ingredients.map(ingredient => ingredient.id);

const getMockOrder = ({ ingredients, placeId }) => ({
  time: "1578301462899",
  kebabs: [
    { ingredients: getIngredientIds(ingredients) },
    { ingredients: getIngredientIds(ingredients) },
  ],
  customerName: "Bruno",
  phone: "123-45-32",
  place: placeId
});

describe('Orders service', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect);

  let place;
  let ingredients;
  beforeAll(async () => {
    place = await PlacesService.create({ name: 'place 1', adress: 'test adress' });
    const ingredient1 = await IngredientsService.create({ name: 'roll', price: 5 });
    const ingredient2 = await IngredientsService.create({ name: 'roll', price: 8 });
    ingredients = [ingredient1, ingredient2];
  });

  beforeEach(async () => {
    await Order.deleteMany({}).exec();
  });

  test('should throw error when try to create Order w/o kebabs', async () => {
    return expect(OrdersService.create({
      ...getMockOrder({ ingredients, placeId: place.id }),
      kebabs: undefined
    })).rejects.toThrow('missing Data')
  });

  test('should throw error when try to create Order w/o kebabs', async () => {
    return expect(OrdersService.create({
      ...getMockOrder({ ingredients, placeId: place.id }),
      kebabs: []
    })).rejects.toThrow('missing Data')
  });

  test('should create Order and store it in DB', async () => {
    const item = await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));
    const storedItem = await Order.findById(item.id).exec();

    expect(storedItem).not.toBeNull();
    expect(item.price).toBe(26);
    expect(item.place.id).toBe(place.id);
    expect(item.kebabs[0].ingredients).toHaveLength(2);
  });

  test('should update Order and store it in DB', async () => {
    const item = await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));
    const newTime = 1578301462890;

    await OrdersService.update(item.id, { time: newTime })

    const updatedItem = await Order.findById(item.id).exec();

    expect(updatedItem.time).toEqual(new Date(newTime));
    expect(item.price).toBe(26);
    expect(item.place.id).toBe(place.id);
    expect(item.kebabs[0].ingredients).toHaveLength(2);
  });

  test('should remove Order from DB', async () => {
    const item = await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));
    let storedItem = await Order.findById(item.id).exec();

    expect(storedItem).not.toBeNull();

    await OrdersService.remove(item.id)

    storedItem = await Order.findById(item.id).exec();

    expect(storedItem).toBeNull();
  });

  test('should return Order by passed params', async () => {
    await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));
    await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));

    const searchData = await OrdersService.search();

    expect(searchData).toHaveLength(2);
    expect(searchData[0].place == place.id).toBeTruthy();
  });

  test('should return Order by passed params with populated data', async () => {
    await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));
    await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));

    const searchData = await OrdersService.search({}, true);

    expect(searchData).toHaveLength(2);
    expect(searchData[0].place.id).toBe(place.id);
  });

  test('should return Order by passed place with populated data', async () => {
    const anotherPlace = await PlacesService.create({ name: 'place 1', adress: 'test adress' });
    await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));
    await OrdersService.create(getMockOrder({ ingredients, placeId: anotherPlace.id }));

    const searchData = await OrdersService.search({place: anotherPlace.id}, true);

    expect(searchData).toHaveLength(1);
    expect(searchData[0].place.id).toBe(anotherPlace.id);
  });

  test('should return Order by passed id with populated data', async () => {
    await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));
    const order = await OrdersService.create(getMockOrder({ ingredients, placeId: place.id }));

    const searchData = await OrdersService.search({id: order.id}, true);

    expect(searchData).toHaveLength(1);
    expect(searchData[0].id).toBe(order.id);
  });

  xtest('should return next Order', () => {
    OrdersService.searchNextOrder()
  });

  xtest('should return error if next Order called w/o place', () => {
    return expect(OrdersService.searchNextOrder()).rejects.toThrow('missing Place');
  });
})