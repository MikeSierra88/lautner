var express   = require('express'),
    Arlista   = require('../models/arlista'),
    Kategoria = require('../models/kategoria'),
    Termek    = require('../models/termek');
var router    = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('arlistak');
});

// var termekek = [
//   {nev: "Minyon", kategoria: "sutemeny", kiszereles: "darab", ar:"250 Ft"},
//   {nev: "Kardinalis", kategoria: "sutemeny", kiszereles: "darab", ar:"350 Ft"},
//   {nev: "Teasutemeny", kategoria: "sutemeny", kiszereles: "ledig", ar:"3000 Ft/kg"},
//   {nev: "Csokifagyi", kategoria: "fagyi", kiszereles: "doboz", ar:"1500 Ft"},
//   {nev: "Csokitorta", kategoria: "torta", kiszereles: "torta", ar:"4500 Ft"}
// ]

// Seed database

// Arlista.create({
//   url: "hazhoz",
//   title: "Házhoz szállítási ajánlatunk"
//   }, function(err, arlista) {
//     if (err) {
//       console.log(err);
//     } 
// });

// Arlista.findOne({ url: "hazhoz" }, function(err, foundArlista) {
//   if (err) {
//     console.log(err);
//   } else {
//     var newKat = new Kategoria({
//       kat: "Tortaszeletek",
//       arlista: foundArlista._id,
//       termekek: []
//     });
//     newKat.save(function(err) {
//       if (err) { console.log(err) }
//       else console.log("Saved");
//     });
//   }
// });

// Arlista.findOne({ url: "hazhoz" }, function(err, foundArlista) {
//   if (err) {
//     console.log(err);
//   } else {
//     Kategoria.findOne({arlista: foundArlista._id}, function (err, foundKategoria) {
//       if (err) {
//         console.log(err);
//       } else {
//         var newTermek = new Termek({
//           nev: "Minyon",
//           kiszereles: "darab",
//           ar: 250
//         });
//         foundKategoria.termekek.push(newTermek);
//         foundKategoria.save(function(err) {
//           if (err) { console.log(err) }
//           else console.log("Saved");
//         });
//       }
//     });
//   }
// });

router.get('/arlistak', function(req, res, next) {
  Arlista.find({}, function(err, arlistak){
    if (err) {
      console.log(err);
    } else {
      res.render("arlistak", {arlistak: arlistak});
    }
  });
});

router.get('/arlistak/:arlistaUrl', function(req, res, next) {
  Arlista.findOne({url: req.params.arlistaUrl}, function(err, foundArlista){
    if (err) {
      console.log(err);
    } else {
      if  (foundArlista) {
        Kategoria.find({arlista: foundArlista._id}).exec(function (err, foundKategoriak) {
          if (err) {
            console.log(err);
          } else {
            
            res.render("showArlista", {arlista: foundArlista, kategoriak: foundKategoriak});
          }
        });
      } else {
        res.redirect('/arlista');
      }
    }
  });
});

router.post('/hazhoz', function (req, res, next) {
  
  res.redirect('/hazhoz');
});

router.get('/arlistak/new', function(req, res, next){
  res.render('new', {});
});

router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
