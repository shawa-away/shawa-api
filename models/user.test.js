const mongoose = require('mongoose');
const { User, USER_TYPE } = require('./user');
const DBTestHelper = require('./../tests/helpers/connection');
const ValidationError = mongoose.Error.ValidationError;

describe('User Model', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect)

  beforeEach(async () => {
    await User.deleteMany({}).exec();
  });

  test('should successfully save User', async () => {
    expect.assertions(1);
    const user = new User({ name: 'user 1', type: USER_TYPE.COOK, password: 'test', login: 'user', place: "5e04773e2894674b2ae74fe4" });

    return user.save().then(item => {
      expect(item).toEqual(user);
    });
  });

  test('should throw error when name is empty', async () => {
    expect.assertions(1);
    const user = new User({ type: USER_TYPE.COOK, password: 'test', login: 'user', place: "5e04773e2894674b2ae74fe4" });

    return user.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when type is empty', async () => {
    expect.assertions(1);
    const user = new User({ name: 'user 1', password: 'test', login: 'user', place: "5e04773e2894674b2ae74fe4" });

    return user.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when type is not equal to [cook, admin, super]', async () => {
    expect.assertions(1);
    const user = new User({ name: 'user 1', type: 'test', password: 'test', login: 'user', place: "5e04773e2894674b2ae74fe4" });

    return user.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when password is empty', async () => {
    expect.assertions(1);
    const user = new User({ name: 'user 1', type: USER_TYPE.COOK, login: 'user', place: "5e04773e2894674b2ae74fe4" });

    return user.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when login is empty', async () => {
    expect.assertions(1);
    const user = new User({ name: 'user 1', type: USER_TYPE.COOK, password: 'test', place: "5e04773e2894674b2ae74fe4" });

    return user.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when place is empty', async () => {
    expect.assertions(1);
    const user = new User({ name: 'user 1', type: USER_TYPE.COOK, password: 'test', login: 'user' });

    return user.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });
})