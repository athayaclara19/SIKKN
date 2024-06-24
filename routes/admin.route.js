var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validtoken.middleware');
const role= require ('../middleware/checkrole.middleware');



router.get('/dashboard', verifyToken, function(req, res, next) {

  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userNim = req.userNim;
  const userRole = req.userRole;

  res.render('admin/dashboard', { userId,userEmail,userName,userNim,userRole });
});

//
module.exports = router;