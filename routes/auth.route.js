var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');
const verifyToken= require ('../middleware/validtoken.middleware');



router.get('/', function(req, res) {
    res.redirect('/login');
  });
  
router.get('/login', controller.form);
router.post('/login', controller.checklogin);

router.get('/ubah-pw',verifyToken, function(req, res, next) {
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userNim = req.userNim;
  const userRole = req.userRole;
  
  res.render('ubah-pw', { userId,userEmail,userName,userNim,userRole  });
});

router.post('/logout', verifyToken,controller.logout);
module.exports = router;
