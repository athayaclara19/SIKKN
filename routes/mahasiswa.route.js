var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validtoken.middleware');
const role= require ('../middleware/checkrole.middleware');
const { changePassword }= require ('../controller/auth.controller');



router.get('/home', verifyToken, function(req, res) {
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userNim = req.userNim;
  const userRole = req.userRole;

  
  res.render('home', { userId,userEmail,userName,userNim,userRole });
});


router.get('/mahasiswa/profil', verifyToken, function(req, res, next) {
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userNim = req.userNim;
  const userRole = req.userRole;
  res.render('lihatprofil', { userId,userEmail,userName,userNim,userRole});
});

router.post('/change-password', verifyToken, async (req, res) => {
  try {
    await changePassword(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});


module.exports = router;
