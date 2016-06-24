var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');

//esquema para el modelo de usuario
var userSchema = mongoose.Schema({
      google      : {
          id      : String,
          token   : String,
          email   : String,
          name    : String
      }
});

//Métodos
//Generamos el hash
// userSchema.methods.generateHash = function(password){
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

//Checamos si el password es valido
// user.Schema.methods.validPassword = function(password){
//     return bcrypt.compareSync(password, this.local.password);
// };

module.exports = mongoose.model('User', userSchema);
