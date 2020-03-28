var express   = require('express'),
    Arlista   = require('../models/arlista'),
    Kategoria = require('../models/kategoria'),
    Termek    = require('../models/termek');
var router    = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('arlistak');
});

// GET arlistak aggregate
router.get('/arlistak', function(req, res, next) {
  Arlista.find({}, function(err, arlistak){
    if (err) {
      console.log(err);
    } else {
      res.render("arlistak", {arlistak: arlistak});
    }
  });
});

// GET arlista show page by url
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

// POST new arlista
router.post('/arlista', async function (req, res, next) {
  var arlista = new Arlista({
      url: req.body.url,
      title: req.body.title
    });
  try {
    
    arlista.save();
  } catch (err) {
    console.log(err);
  }
  var redirectUrl = "/arlistak/"+arlista.url+"/edit"
  res.redirect(redirectUrl);
});

// GET show arlista edit form
router.get('/arlistak/:arlistaUrl/edit', function(req, res, next) {
  Arlista.findOne({url: req.params.arlistaUrl}, function(err, foundArlista){
    if (err) {
      console.log(err);
    } else {
      if  (foundArlista) {
        Kategoria.find({arlista: foundArlista._id}).exec(function (err, foundKategoriak) {
          if (err) {
            console.log(err);
          } else {
            res.render("editArlista", {arlista: foundArlista, kategoriak: foundKategoriak});
          }
        });
      } else {
        res.redirect('/arlista');
      }
    }
  });
});

// POST new termek
router.post('/arlistak/:arlistaUrl/termek', async function(req, res, next) {
  var newTermek = new Termek({
        nev: req.body.nev,
        kiszereles: req.body.kiszereles,
        ar: req.body.ar
      });
  try {
    var foundArlista = await Arlista.findOne({ url: req.params.arlistaUrl });
    if (req.body.kateg == "new") {
      var ujKat = new Kategoria({
        kat: req.body.ujkateg,
        arlista: foundArlista._id,
        termekek: [newTermek]
      });
      await ujKat.save();
      console.log(ujKat);
    } else {
      var foundKategoria = await Kategoria.findById(req.body.kateg);
      foundKategoria.termekek.push(newTermek);
      await foundKategoria.save();
    }
  } catch (err) {
    console.log(err);
  }
  var renderUrl = '/arlistak/'+req.params.arlistaUrl+'/edit';
  res.redirect(renderUrl);
});

// DELETE arlista
router.delete("/arlistak/:arlistaUrl", function(req, res){
  res.send("delete route reached");
});

// DELETE kategoria

// DELETE termek
router.delete("/arlistak/:arlistaUrl/:kategoria/:termek", function(req, res){
  res.send("delete route reached");
});

router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
