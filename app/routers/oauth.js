var express = require('express');
var router = express.Router();
var config = require('../../config/config');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(config.oauth.google.clientid,
  config.oauth.google.clientsecret,
  config.oauth.google.redirecturl);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/plus.me'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

router.get('/',function(req,resp){
  console.log(req.query.code);

  oauth2Client.getToken(req.query.code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if(!err) {
        console.log('Tokens:' + JSON.stringify(tokens));
        oauth2Client.setCredentials(tokens);
      }
    });

  resp.send('Ok');
})



module.exports = router;
