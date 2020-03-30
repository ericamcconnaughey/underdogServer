const express = require('express');
const bodyParser = require('body-parser');
const Pet = require('../models/pet');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.get((req, res, next) => {
  res.end('Will send Favorites info');
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /favorites');
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /favorites');
})
.delete((req, res) => {
  res.end(`Will DELETE ${req.body.name}`);
});

module.exports = favoritesRouter;