const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

class Mongo {

  Mongo() {
    mongoose.Promise = Promise;
  }

  connection(InMemory = false) {
    if (InMemory) {
      this.connectionInMemory('todo-list');
    } else {
      this.toConnect(process.env.DB_URL);
    }
  }

  connectionInMemory(mongoUri) {
    const mongoServer = new MongoMemoryServer();
    mongoServer.getConnectionString().then((mongoUri) => {
      this.toConnect(mongoUri);
    });
  }

  toConnect(mongoUri) {
    mongoose.connect(mongoUri);

    mongoose.connection.on('error', (e) => {
      if (e.message.code === 'ETIMEDOUT') {
        console.log(e);
        mongoose.connect(mongoUri);
      }
      console.log(e);
    });

    mongoose.connection.once('open', () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
  }
}

module.exports = Mongo;