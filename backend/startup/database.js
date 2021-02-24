const logger = require("./logger");
const config = require("config");
const mongoose = require("mongoose");

module.exports =  async function () {
  await mongoose
    .connect(config.get('DB_URL'),  {useNewUrlParser: true, useUnifiedTopology: false })
    .then(() => logger.info("Connected to MongoDB"));
};
