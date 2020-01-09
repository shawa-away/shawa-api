const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const IngredientService = require('./ingredients');

const mockIngredient = { name: 'roll', price: 5 };

describe('Ingredients service', () => {
  let connection;
  let db;
  beforeAll(async () => {
    // console.log(global.__MONGO_URI__)
    // connection = await MongoClient.connect(global.__MONGO_URI__, {
    //   useNewUrlParser: true,
    // });
    // db = await connection.db(global.__MONGO_DB_NAME__);
    console.log(process.env.MONGO_URL)
      connection = await MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  test('should create Ingredient and store it in DB', async (done) => {
    console.log(123)
    try {

      const a = await IngredientService.create(mockIngredient);
      console.log(a);

    const data = db.collection('ingredients');
    console.log(data.find())
    done()
    } catch(err) {
      console.log('err', err)
    }
    
  });
})