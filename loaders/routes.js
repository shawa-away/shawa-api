const usersRouter = require('./../routes/users');
const placesRouter = require('./../routes/places');
const ingredientsRouter = require('./../routes/ingredients');
const orderRouter = require('./../routes/orders');
const kebabRouter = require('./../routes/kebabs');

module.exports = {
  init: (app) => {
    app.use('/users', usersRouter);
    app.use('/places', placesRouter);
    app.use('/ingredients', ingredientsRouter);
    app.use('/orders', orderRouter);
    app.use('/kebabs', kebabRouter);
  }
}