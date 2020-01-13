const mongoose = require('mongoose');
const Place = require('./place');
const DBTestHelper = require('./../tests/helpers/connection');
const ValidationError = mongoose.Error.ValidationError;

describe('Place Model', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect)

  beforeEach(async () => {
    await Place.deleteMany({}).exec();
  });

  test('should successfully save Place', async () => {
    expect.assertions(1);
    const place = new Place({ name: 'place 1', adress: "test" });

    return place.save().then(item => {
      expect(item).toEqual(place);
    });
  });

  test('should throw error when name is empty', async () => {
    expect.assertions(1);
    const place = new Place({ adress: "test" });

    return place.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when adress is empty', async () => {
    expect.assertions(1);
    const place = new Place({ name: 'fish' });

    return place.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });
})