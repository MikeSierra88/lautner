var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index.ejs");
});

router.get('/kapcsolat', function(req, res, next) {
  res.render("kapcsolat.ejs");
});

router.get('/rendezveny', function(req, res, next) {
  res.render("event.ejs");
});

router.get('/viszontelado', function(req, res, next) {
  res.render("retailer.ejs");
});

router.get('/rolunk', function(req, res, next) {
  res.render("rolunk.ejs");
});

router.get('/kinalat', function(req, res, next) {
  res.render("kinalat.ejs");
});

// router.get('/karacsony', function(req, res, next) {
//   res.render("kinalat-karacsony.ejs");
// });

// router.get('/husvet', function(req, res, next) {
//   res.redirect("/kinalat");
// });

router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
