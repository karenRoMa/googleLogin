var express = require('express');
var router = express.Router();

router.get('/',function(req,resp){
  resp.render('index.pug');
});

  //exportamos el router para usarlo en la aplicación

module.exports = router;
