const mongoose = require('mongoose');

module.exports = {
  init: () => {
    mongoose.connect('mongodb://localhost/sha-api', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      // we're connected!
      console.log('connected!!!!!!!!!!!!!');
    });

  }
}