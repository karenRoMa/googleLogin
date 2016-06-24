
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Cargamos nuestro modelo de usuario
var User = require('../app/models/user');

//cargamos las credenciales
var configAuth = require('./config');

module.exports = function(passport) {

    //serializamos al usuario para la sesión
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    //deserializr al usuario
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //google
    passport.use(new GoogleStrategy({

        clientID        : configAuth.oauth.google.clientid,
        clientSecret    : configAuth.oauth.google.clientsecret,
        callbackURL     : configAuth.oauth.google.redirecturl,

    },

    function(token, refreshToken, profile, done){
      console.log('Token: ' + token);
        //hacemos el código asíncrono
        //User.findOne no se ejecutará hasta que tengamos
        //todos los datos de regreso desde google
        process.nextTick(function(){
          console.log('Buscando en la base de datos');
            //Tratamos de encontrar el usuario basado en su google id
            User.findOne({'google.id' : profile.id}, function(err, user){
              console.log('busqueda finalizada.');
                if(err)
                    return done(err);

                if(user){
                  console.log('Encontramos un usuario: ' + user);
                    //Si se encuentra un usuario, ingresamos
                    return done(null, user);

                }else{
                  console.log('El usuario no existe... Creando usuario nuevo');
                    //si el usuario no está en la base de datos, creamos uno nuevo
                    var newUser = new User();

                    //definimos la información importante
                    newUser.google.id     = profile.id;
                    newUser.google.token  = token;
                    newUser.google.name   = profile.displayName;
                    newUser.google.email  = profile.emails[0].value;

                    //guardamos el usuario
                    newUser.save(function(err){
                        if(err)
                          throw err;

                        console.log('regresando usuario creado en done()');
                        return done(null, newUser);
                    });
                  }
            });
        });

    }));
};
