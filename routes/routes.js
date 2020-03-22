var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("It works!");
});

router.get('/hazhoz', function(req, res, next) {
  res.render("hazhoz.ejs");
});

router.get('/hazhoz', function(req, res, next) {
  res.send("Hazhozszallitas!");
});

module.exports = router;
