const IngredientService = require('./ingredients');
const Ingredient = require('../models/ingredient');
const DBTestHelper = require('./../tests/helpers/connection');

const mockIngredient = { name: 'roll', price: 5 };

describe('Ingredients service', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect)

  beforeEach(async () => {
    await Ingredient.deleteMany({}).exec();
  });

  test('should create Ingredient and store it in DB', async () => {
    const item = await IngredientService.create(mockIngredient);
    const storedItem = await Ingredient.findById(item.id).exec();

    expect(storedItem).not.toBeNull();

  });

  test('should update Ingredient and store it in DB', async () => {
    const item = await IngredientService.create(mockIngredient);
    const newName = 'roll2';

    await IngredientService.update(item.id, { name: newName })

    const updatedItem = await Ingredient.findById(item.id).exec();

    expect(updatedItem.name).toBe(newName);
  });

  test('should remove Ingredient from DB', async () => {
    const item = await IngredientService.create(mockIngredient);
    let storedItem = await Ingredient.findById(item.id).exec();

    expect(storedItem).not.toBeNull();

    await IngredientService.remove(item.id)

    storedItem = await Ingredient.findById(item.id).exec();

    expect(storedItem).toBeNull();
  });

  test('should return Ingredient items by passed params', async () => {
    await IngredientService.create(mockIngredient);
    await IngredientService.create(mockIngredient);

    const searchData = await IngredientService.search();

    expect(searchData).toHaveLength(2);
  });
})