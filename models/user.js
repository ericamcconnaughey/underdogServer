const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

//sub-document
const favoriteSchema = new Schema({
  favoritePet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }
}, {
  timestamps: true
})

const userSchema = new Schema({
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false
  }, 
  favorites: [favoriteSchema]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
