const express = require('express');
const cors = require('cors');
const error = require("./../middleware/error");
const memes  = require('../service/memes');

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/memes", memes);
  app.use(error);
};
