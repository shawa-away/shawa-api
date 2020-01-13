const mongoose = require('mongoose');
const Ingredient = require('./ingredient');
const DBTestHelper = require('./../tests/helpers/connection');
const ValidationError = mongoose.Error.ValidationError;

describe('Ingredient Model', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect)

  beforeEach(async () => {
    await Ingredient.deleteMany({}).exec();
  });

  test('should successfully save Ingredient', async () => {
    expect.assertions(1);
    const ingredient = new Ingredient({ name: 'fish', price: 5 });

    return ingredient.save().then(item => {
      expect(item).toEqual(ingredient);
    });
  });

  test('should throw error when name is empty', async () => {
    expect.assertions(1);
    const ingredient = new Ingredient({ price: 5 });

    return ingredient.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when price is empty', async () => {
    expect.assertions(1);
    const ingredient = new Ingredient({ name: 'fish' });

    return ingredient.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });
})