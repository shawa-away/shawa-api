const routes = require('./routes');
const mongoose = require('./mongoose');
const express = require('./express');
const errorHandlers = require('./errorHandlers');

module.exports = {
  init: (app) => {
    [mongoose, express, routes, errorHandlers].map(loader => loader.init(app));

    return app;
  }
}