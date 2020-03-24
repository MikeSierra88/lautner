var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('hazhoz');
});

var termekek = [
  {nev: "Minyon", kategoria: "sutemeny", kiszereles: "darab", ar:"250 Ft"},
  {nev: "Kardinalis", kategoria: "sutemeny", kiszereles: "darab", ar:"350 Ft"},
  {nev: "Teasutemeny", kategoria: "sutemeny", kiszereles: "ledig", ar:"3000 Ft/kg"},
  {nev: "Csokifagyi", kategoria: "fagyi", kiszereles: "doboz", ar:"1500 Ft"},
  {nev: "Csokitorta", kategoria: "torta", kiszereles: "torta", ar:"4500 Ft"}
];

var kategoriak = [
  {kat: "sutemeny"},
  {kat: "fagyi"},
  {kat: "torta"}
];

router.get('/hazhoz', function(req, res, next) {
  res.render("hazhoz.ejs", {termekek:termekek, kategoriak:kategoriak});
});

router.post('/hazhoz', function (req, res, next) {
  var newNev = req.body.nev;
  var newKategoria = req.body.kategoria;
  var newKiszereles = req.body.kiszereles;
  var newAr = req.body.ar;
  var newSuti = {nev: newNev, kategoria: newKategoria, kiszereles: newKiszereles, ar: newAr};
  termekek.push(newSuti);
  res.redirect('/hazhoz');
});

router.get('/hazhoz/new', function(req, res, next){
  res.render('new.ejs', {kategoriak:kategoriak});
});

router.get('/husvet', function(req, res, next) {
  res.render("husvet.ejs", {termekek:termekek, kategoriak:kategoriak});
});

router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
