module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest-test'
    },
    binary: {
      version: '4.2.2',
      skipMD5: true
    },
    autoStart: false
  }
};