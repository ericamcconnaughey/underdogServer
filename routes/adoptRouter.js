const express = require('express');
const bodyParser = require('body-parser');
// const Pet = require('../models/pet');

const adoptRouter = express.Router();

adoptRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader = ('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end('Will send Adopt info');
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /adopt');
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /adopt');
})
.delete((req, res) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /adopt');
});

module.exports = adoptRouter;