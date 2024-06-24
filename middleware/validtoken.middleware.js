const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect("/login");
      
    }
  
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Gagal untuk melakukan verifikasi token.' });
      }
      req.userId = decoded.id;
      req.userEmail = decoded.email;
      req.userName = decoded.name;
      req.userNim = decoded.nim;
      req.userRole = decoded.role; 
      
      next();
    });

 

  }

  module.exports = verifyToken;