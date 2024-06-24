function checkRole(role) {
  
    return function(req, res, next) {
      if (req.userRole === role) {
        next(); 
      } else {
        res.status(403).send('Akses ditolak. Anda tidak memiliki izin yang cukup.');
      }
    };
  }

  module.exports = checkRole;