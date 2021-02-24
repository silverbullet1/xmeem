const express = require('express');
const cors = require('cors');
const logger = require('./logger')
const swaggerApp = express();
const swaggerPort = 8080;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../helper/swaggerDocument.json");

module.exports = function () {
  swaggerApp.use(cors());
  swaggerApp.use(
    "/swagger-ui",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
  swaggerApp.listen(swaggerPort, () => {
    logger.info("Swagger up and running on" + swaggerPort);
  });
};
