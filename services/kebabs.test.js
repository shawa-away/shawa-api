const KebabService = require('./kebabs');
const IngredientService = require('./ingredients');
const Kebab = require('../models/kebab');
const DBTestHelper = require('./../tests/helpers/connection');

// Register Ingredient model
require('../models/ingredient');

const getMockKebab = (ingredients = ["5e04773e2894674b2ae74fe4", "5e04773e2894674b2ae74fe4"]) => ({ name: 'default-kebab', ingredients });
const mockIngredient = { name: 'roll', price: 5 };

describe('Kebab service', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect)

  beforeEach(async () => {
    await Kebab.deleteMany({}).exec();
  });

  test('should create Kebab and store it in DB', async () => {
    const item = await KebabService.create(getMockKebab());
    const storedItem = await Kebab.findById(item.id).exec();

    expect(storedItem).not.toBeNull();
  });

  test('should update Kebab and store it in DB', async () => {
    const item = await KebabService.create(getMockKebab());
    const newName = 'default-kebab-updated';

    await KebabService.update(item.id, { name: newName })

    const updatedItem = await Kebab.findById(item.id).exec();

    expect(updatedItem.name).toBe(newName);
  });

  test('should remove Kebab from DB', async () => {
    const item = await KebabService.create(getMockKebab());
    let storedItem = await Kebab.findById(item.id).exec();

    expect(storedItem).not.toBeNull();

    await KebabService.remove(item.id)

    storedItem = await Kebab.findById(item.id).exec();

    expect(storedItem).toBeNull();
  });

  test('should return Kebab items by passed params', async () => {
    const ingredient = await IngredientService.create(mockIngredient);
    await KebabService.create(getMockKebab([ingredient.id]));

    const searchData = await KebabService.search();

    expect(searchData).toHaveLength(1);
    expect(searchData[0].ingredients[0]).toMatchObject(mockIngredient);
  });
})