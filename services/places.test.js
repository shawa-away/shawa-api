const PlacesService = require('./places');
const Place = require('../models/place');
const DBTestHelper = require('./../tests/helpers/connection');

const mockPlace = { name: 'place 1', adress: 'test adress' };

describe('Places service', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect)

  beforeEach(async () => {
    await Place.deleteMany({}).exec();
  });

  test('should create Place and store it in DB', async () => {
    const item = await PlacesService.create(mockPlace);
    const storedItem = await Place.findById(item.id).exec();

    expect(storedItem).not.toBeNull();

  });

  test('should update Place and store it in DB', async () => {
    const item = await PlacesService.create(mockPlace);
    const newName = 'place 2';

    await PlacesService.update(item.id, { name: newName })

    const updatedItem = await Place.findById(item.id).exec();

    expect(updatedItem.name).toBe(newName);
  });

  test('should remove Place from DB', async () => {
    const item = await PlacesService.create(mockPlace);
    let storedItem = await Place.findById(item.id).exec();

    expect(storedItem).not.toBeNull();

    await PlacesService.remove(item.id)

    storedItem = await Place.findById(item.id).exec();

    expect(storedItem).toBeNull();
  });

  test('should return Place items by passed params', async () => {
    await PlacesService.create(mockPlace);
    await PlacesService.create(mockPlace);

    const searchData = await PlacesService.search();

    expect(searchData).toHaveLength(2);
  });
})