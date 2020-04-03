const express = require('express');
const bodyParser = require('body-parser');
const Pet = require('../models/pet');
const User = require('../models/user');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
  User.findById(req.user._id)
  .then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user.favorites);
  })
  .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /favorites');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  //ONLY USER IS AUTHORIZED TO DELETE THEIR OWN FAVORITES
  User.findByIdAndUpdate(req.user._id, {
    $set: { favorites: [] } //replaces favorites with empty array
  }, { new: true }) //returns updated doc
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});


favoritesRouter.route('/:petId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
  Pet.findById(req.params.petId)
  .then(pet => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(pet);
  })
  .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /favorites/${req.params.petId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end(`PUT operation not supported on /favorites/${req.params.petId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  //ONLY USER IS AUTHORIZED TO DELETE THEIR OWN FAVORITES
  User.findById(req.user._id)
  .then(user => {
    let favorite = user.favorites.find(favorite => {
      return favorite.favoritePet == req.params.petId
    });
    user.favorites.id(favorite._id).remove();
    user.save()
  .then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  })
  })
  .catch(err => next(err));
});

module.exports = favoritesRouter;


//OLD WAY TO DELETE A SINGLE FAVORITE (NOT WORKING)
// User.findByIdAndUpdate(req.user._id, {
//   $pull: { favorites: req.params.petId } //removes pet from favorites
// }, { new: true }) //returns updated doc
// .then(response => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'application/json');
//   res.json(response);
// })
// .catch(err => next(err));
// });