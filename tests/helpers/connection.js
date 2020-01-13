const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
}

const disconnect = () => mongoose.connection.close();

module.exports = {
  connect,
  disconnect
};