var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('hazhoz');
});

var termekek = [
  {nev: "Minyon", kategoria: "sutemeny", kiszereles: "darab", ar:"250 Ft"},
  {nev: "Kardinalis", kategoria: "sutemeny", kiszereles: "darab", ar:"350 Ft"},
  {nev: "Teasutemeny", kategoria: "sutemeny", kiszereles: "ledig", ar:"3000 Ft/kg"}
]

var kategoriak = [
  {kat: "sutemeny"}  
]

router.get('/hazhoz', function(req, res, next) {

  var kategoriak = [
    {kat: "sutemeny"}  
  ]
  
  res.render("hazhoz.ejs", {termekek:termekek, kategoriak:kategoriak});
});

router.post('/hazhoz', function (req, res, next) {
  var nev = req.body.nev;
  var kategoria = req.body.kategoria;
  var kiszereles = req.body.kiszereles;
  var ar = req.body.ar;
  var newSuti = {nev: nev, kategoria: kategoria, kiszereles: kiszereles, ar: ar};
  termekek.push(newSuti);
  res.redirect('/hazhoz');
  next();
});

router.get('/hazhoz/new', function(req, res, next){
  res.render('new.ejs')
});

router.get('/husvet', function(req, res, next) {
  res.render("husvet.ejs");
});

router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
