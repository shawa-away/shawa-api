const mongoose = require('mongoose');
const { Order, ORDER_STATUS } = require('./order');
const DBTestHelper = require('./../tests/helpers/connection');
const ValidationError = mongoose.Error.ValidationError;

const mockOrder = {
  time: '1578923143894',
  place: "5e04773e2894674b2ae74fe4",
  kebabs: [
    { ingredients: ['5e04773e2894674b2ae74fe4', '5e04773e2894674b2ae74fe4'] }
  ],
  phone: '123-123-123',
  customerName: 'Volod',
  price: 15,
  status: ORDER_STATUS.TODO,
  cook: '5e04773e2894674b2ae74fe4',
  doneTime: '1578923143994',
  comments: 'test comment'
};

describe('Order Model', () => {
  beforeAll(DBTestHelper.connect);

  afterAll(DBTestHelper.disconnect)

  beforeEach(async () => {
    await Order.deleteMany({}).exec();
  });

  test('should successfully save Order', async () => {
    expect.assertions(1);
    const order = new Order(mockOrder);

    return order.save().then(item => {
      expect(item).toEqual(order);
    });
  });

  test('should throw error when time is empty', async () => {
    expect.assertions(1);
    const order = new Order({
      ...mockOrder,
      time: undefined,
    });

    return order.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when time is incorrect format', async () => {
    expect.assertions(1);
    const order = new Order({
      ...mockOrder,
      time: '23a'
    });

    return order.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when place is empty', async () => {
    expect.assertions(1);
    const order = new Order({
      ...mockOrder,
      place: undefined
    });

    return order.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when place not an ObjectId', async () => {
    expect.assertions(1);
    const order = new Order({
      ...mockOrder,
      place: "1234a"
    });

    return order.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when kebabs is empty array', async () => {
    expect.assertions(2);
    const order = new Order({
      ...mockOrder,
      kebabs: []
    });

    return order.save().catch((e) => {
      expect(e instanceof Error).toBeTruthy();
      expect(e.message).toBe('Kebabs should be not empty in order');
    })
  });

  test('should throw error when ingredients in kebabs is empty', async () => {
    expect.assertions(2);
    const order = new Order({
      ...mockOrder,
      kebabs: [{ ingredients: [] }]
    });

    return order.save().catch((e) => {
      expect(e instanceof Error).toBeTruthy();
      expect(e.message).toBe('Kebabs should be not empty in order');
    })
  });

  test('should throw error when ingredients in kebabs is empty', async () => {
    expect.assertions(2);
    const order = new Order({
      ...mockOrder,
      kebabs: [{ ingredients: ["5e04773e2894674b2ae74fe4"] }, { ingredients: [] }]
    });

    return order.save().catch((e) => {
      expect(e instanceof Error).toBeTruthy();
      expect(e.message).toBe('Kebabs should be not empty in order');
    })
  });

  test('should throw error when ingredients in kebabs is empty', async () => {
    expect.assertions(2);
    const order = new Order({
      ...mockOrder,
      kebabs: null
    });

    return order.save().catch((e) => {
      expect(e instanceof Error).toBeTruthy();
      expect(e.message).toBe('Kebabs should be not empty in order');
    })
  });

  test('should throw error when phone is empty', async () => {
    expect.assertions(1);
    const order = new Order({
      ...mockOrder,
      phone: undefined
    });

    return order.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when customerName is empty', async () => {
    expect.assertions(1);
    const order = new Order({
      ...mockOrder,
      customerName: undefined
    });

    return order.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when price is empty', async () => {
    expect.assertions(1);
    const order = new Order({
      ...mockOrder,
      price: undefined
    });

    return order.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when status is empty', async () => {
    expect.assertions(1);
    const order = new Order({
      ...mockOrder,
      status: undefined
    });

    return order.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when status is not [todo, inprogress, finished, done]', async () => {
    expect.assertions(1);
    const order = new Order({
      ...mockOrder,
      status: 'willbe'
    });

    return order.save().catch((e) => {
      expect(e instanceof ValidationError).toBeTruthy();
    })
  });

  test('should throw error when status [inprogress, finished, done] and cook is empty', async () => {
    expect.assertions(2);
    const order = new Order({
      ...mockOrder,
      status: ORDER_STATUS.IN_PROGRESS,
      cook: undefined
    });

    return order.save().catch((e) => {
      expect(e instanceof Error).toBeTruthy();
      expect(e.message).toBe('Cook may be empty only in TODO status');
    })
  });
})