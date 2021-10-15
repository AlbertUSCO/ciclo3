const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const schema = mongoose.Schema;

var personSchema = new schema({
firstName: {
    type: String
},
lastName: {
    type: String
},
idNumber: {
    type: Number,
    unique: true
},
email: {
    type: String
},
password: {
  type: String
 
}
},



{
    collection: 'personas'
}

);
personSchema.methods.isCorrectPassword =function(password , callback){
  bcrypt.compare(password, this.password, function(err,same){
    if(err){
      callback(err);
    }else{
      callback(err,same)
    }
  });
  

}




module.exports = mongoose.model('Persona', personSchema);