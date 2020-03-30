const express = require('express');

const volunteerRouter = express.Router();

volunteerRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader = ('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end('Will send Volunteer info');
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /volunteer');
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /volunteer');
})
.delete((req, res) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /volunteer');
});

module.exports = volunteerRouter;