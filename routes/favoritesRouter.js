const express = require('express');
const bodyParser = require('body-parser');
const Pet = require('../models/pet');
const User = require('../models/user');
const authenticate = require('../authenticate');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
  //IF NOT REGISTERED/LOGGED IN
  if (!req.user._id) {
    err = new Error(`You are not logged in. 
    Please login or register to save and see your 
    favorite adoptable pets.`);
    err.status = 403;
    //redirect to login link??
    return next(err);
  } else {
  //IF LOGGED IN
  User.findById(req.user._id)
  .then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user.favorites);
  })
  .catch(err => next(err));
  } 
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /favorites');
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /favorites');
})
.delete(authenticate.verifyUser, (req, res, next) => {
  //ONLY USER IS AUTHORIZED TO DELETE THEIR OWN FAVORITES
  User.findByIdAndUpdate(req.user._id, {
    $set: { favorites: '' } //replaces string of favorites with empty string
  }, { new: true }) //returns updated doc
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

module.exports = favoritesRouter;