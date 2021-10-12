const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var personSchema = new schema({
    local: {
        id: Number,
        email: String,
        password: String
      },
      facebook: {
        id: String,
        token: String,
        email: String,
        password: String
      },
      twitter: {
        id: String,
        token: String,
        email: String,
        password: String
      },
      google: {
        id: String,
        token: String,
        email: String,
        password: String
      }
    },{
      collection: 'personas'
    });
// generating a hash
personSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  // checking if password is valid
  personSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
  };

module.exports = mongoose.model('Persona', personSchema);
