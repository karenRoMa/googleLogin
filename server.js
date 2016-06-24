var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

var app = express();

mongoose.connect(configDB.url);

app.set('view engine','pug');
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());

//Passport configuracion
app.use(session({secret : 'karen'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//routers
var indexRouter = require('./app/routers/index');
// var oauthRouter = require('./app/routers/oauth');
//
// var config = require('./config');
//
app.use('/',indexRouter);
// app.use('/oauth2callback',oauthRouter);
//
// app.post('/info',function(req,resp){
//   console.log('Peticion: '+ req.body);
//   resp.json({
//     "success":true
//   });
// });
//

require('./config/passport')(passport);
require('./app/routers/googleRouter.js')(app,passport);


app.listen(1337, function(){
  console.log('Escuchando en puerto 1337');
});
