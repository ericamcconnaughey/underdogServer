const express = require('express');
const bodyParser = require('body-parser');
const Pet = require('../models/pet');
const User = require('../models/user');
const authenticate = require('../authenticate');
const cors = require('./cors');

const matchRouter = express.Router();

matchRouter.use(bodyParser.json());

matchRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
  Pet.find()
  .then(pets => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(pets);
  })
  .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Pet.create(req.body)
  .then(pet => {
    console.log('Pet created', pet);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(pet);
  })
  .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /match');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  Pet.deleteMany()
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});



matchRouter.route('/:petId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
  Pet.findById(req.params.petId)
  .then(pet => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(pet);
  })
  .catch(err => next(err));
}) //ADD PET TO FAVORITES
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  User.findById(req.user._id)
  .then(user => {
    user.favorites.push({favoritePet: req.params.petId});
    console.log(user.favorites);
    user.save()
    .then(user => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /match/${req.params.petId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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