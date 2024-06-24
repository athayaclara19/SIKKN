// routes/login.js
var express = require('express');
var router = express.Router();
var db = require('../config/db'); 
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  const { email, password } = req.body;
  
  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results, fields) => {
    if (error) {
      console.error('Error querying the database:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      res.json({ success: false, message: 'Invalid email or password' });
    }
  });
});

module.exports = router;
