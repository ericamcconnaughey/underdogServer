//NOT CURRENTLY USING
const express = require('express');

const contactRouter = express.Router();

contactRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader = ('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end('Will send Contact info');
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /contact');
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /contact');
})
.delete((req, res) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /contact');
});

module.exports = contactRouter;