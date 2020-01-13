const mongoose = require('mongoose');
const Kebab = require('./kebab');
const DBTestHelper = require('./../tests/helpers/connection');
const ValidationError = mongoose.Error.ValidationError;

describe('Kebab Model', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect)

  beforeEach(async () => {
    await Kebab.deleteMany({}).exec();
  });

  test('should successfully save Kebab', async () => {
    expect.assertions(1);
    const kebab = new Kebab({ name: 'kebab', ingredients: ["5e04773e2894674b2ae74fe4", "5e04773e2894674b2ae74fe4"] });

    return kebab.save().then(item => {
      expect(item).toEqual(kebab);
    });
  });

  test('should throw error when name is empty', async () => {
    expect.assertions(1);
    const kebab = new Kebab({ ingredients: ["5e04773e2894674b2ae74fe4", "5e04773e2894674b2ae74fe4"] });

    return kebab.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  xtest('should throw error when ingredients is empty', async () => {
    expect.assertions(1);
    const kebab = new Kebab({ name: 'kebab' });

    return kebab.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });
})