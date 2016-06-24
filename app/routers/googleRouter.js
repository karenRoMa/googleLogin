
module.exports = function(app, passport){

    app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile.pug', {
            user  : req.user //obtener el usuario fuera de la sesión
                            //y pasar a la plantilla
        });
    });

    //router para cerrar sesión
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });


    //obtenemos emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email']}));

    app.get('/auth/google/callback', function(req, res, next) {
      console.log('Ruta de callback obtenida...');
      next();
    }, passport.authenticate('google',{
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));
};

//middleware para asegurarse que el usuario inició sesión
function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}
