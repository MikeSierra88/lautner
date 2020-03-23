var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('hazhoz');
});

router.get('/hazhoz', function(req, res, next) {
  res.render("hazhoz.ejs");
});

router.get('/husvet', function(req, res, next) {
  res.render("husvet.ejs");
});

router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
