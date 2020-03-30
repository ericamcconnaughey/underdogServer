const express = require('express');
const bodyParser = require('body-parser');
const Pet = require('../models/pet');

const matchRouter = express.Router();

matchRouter.use(bodyParser.json());

matchRouter.route('/')
.get((req, res, next) => {
  Pet.find()
  .then(pets => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(pets);
  })
  .catch(err => next(err));
})
.post((req, res, next) => {
  //needs to be restricted to admin
  Pet.create(req.body)
  .then(pet => {
    console.log('Pet created', pet);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(pet);
  })
  .catch(err => next(err));
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /match');
})
.delete((req, res) => {
  //needs to be restricted to admin
  Pet.deleteMany()
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

matchRouter.route('/:petId')
.get((req, res, next) => {
  Pet.findById(req.params.petId)
  .then(pet => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(pet);
  })
  .catch(err => next(err));
})
.post((req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /match ${req.params.petId}`);
})
.put((req, res, next) => {
  //needs to be restricted to admin
  Pet.findByIdAndUpdate(req.params.petId, {
    $set: req.body
  }, { new: true })
  .then(pet => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(pet);
  })  
  .catch(err => next(err));
})
.delete((req, res, next) => {
  //needs to be restricted to admin
  Pet.findByIdAndDelete(req.params.petId)
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

module.exports = matchRouter;