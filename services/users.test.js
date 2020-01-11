const UsersService = require('./users');
const PlacesService = require('./places');
const User = require('../models/user');
const DBTestHelper = require('./../tests/helpers/connection');

// Register Place model
require('../models/place');

const getMockUser = placeId => ({ name: 'user', type: 'cook', password: 'password', login: 'test', place: placeId });

describe('Users service', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect);

  let place;
  beforeAll(async () => {
    place = await PlacesService.create({ name: 'place 1', adress: 'test adress' });
  });

  beforeEach(async () => {
    await User.deleteMany({}).exec();
  });

  test('should create User and store it in DB', async () => {
    const item = await UsersService.create(getMockUser(place.id));
    const storedItem = await User.findById(item.id).exec();

    expect(storedItem).not.toBeNull();
    expect(item.place.id).toBe(place.id)
  });

  test('should update User and store it in DB', async () => {
    const item = await UsersService.create(getMockUser(place.id));
    const newName = 'update-user';

    await UsersService.update(item.id, { name: newName })

    const updatedItem = await User.findById(item.id).exec();

    expect(updatedItem.name).toBe(newName);
    expect(item.place.id).toBe(place.id)
  });

  test('should remove User from DB', async () => {
    const item = await UsersService.create(getMockUser(place.id));
    let storedItem = await User.findById(item.id).exec();

    expect(storedItem).not.toBeNull();

    await UsersService.remove(item.id)

    storedItem = await User.findById(item.id).exec();

    expect(storedItem).toBeNull();
  });

  test('should return User items by passed params', async () => {
    await UsersService.create(getMockUser(place.id));
    await UsersService.create(getMockUser(place.id));

    const searchData = await UsersService.search();

    expect(searchData).toHaveLength(2);
    expect(searchData[0].place.id).toEqual(place.id);
  });
})