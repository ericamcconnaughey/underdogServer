const express = require('express');
const bodyParser = require('body-parser');
const Pet = require('../models/pet');
const User = require('../models/user');
const authenticate = require('../authenticate');

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
.post(authenticate.verifyUser, (req, res, next) => {
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
.delete(authenticate.verifyUser, (req, res) => {
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
.put(authenticate.verifyUser, (req, res, next) => {
  //ADD PET TO FAVORITES
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
// .put(authenticate.verifyUser, (req, res, next) => {
//   //UPDATE PET PROFILE
//   //needs to be restricted to admin
//   Pet.findByIdAndUpdate(req.params.petId, {
//     $set: req.body
//   }, { new: true })
//   .then(pet => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json(pet);
//   })  
//   .catch(err => next(err));
// })
.delete(authenticate.verifyUser,  (req, res, next) => {
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