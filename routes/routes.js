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
      res.render("error", {error: err});
    } else {
      if  (foundArlista) {
        Kategoria.find({arlista: foundArlista._id}).exec(function (err, foundKategoriak) {
          if (err) {
            res.render("error", {error: err});
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
  
  await arlista.save()
    .then(function(){
      var redirectUrl = "/arlistak/"+arlista.url+"/edit";
      res.redirect(redirectUrl);
    })
    .catch(function(err){
      res.render("error", {error: err});
    });
});

// GET show arlista edit form
router.get('/arlistak/:arlistaUrl/edit', function(req, res, next) {
  Arlista.findOne({url: req.params.arlistaUrl}, function(err, foundArlista){
    if (err) {
      res.render("error", {error: err});
    } else {
      if  (foundArlista) {
        Kategoria.find({arlista: foundArlista._id}).exec(function (err, foundKategoriak) {
          if (err) {
            res.render("error", {error: err});
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

// POST new termek, and new kategoria if needed
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
    } else {
      var foundKategoria = await Kategoria.findById(req.body.kateg);
      foundKategoria.termekek.push(newTermek);
      await foundKategoria.save();
    }
  } catch (err) {
    res.render("error", {error: err});
  }
  var renderUrl = '/arlistak/'+req.params.arlistaUrl+'/edit';
  res.redirect(renderUrl);
});

// UPDATE termek
router.put("/arlistak/:arlistaUrl/:kategoria", async function(req, res){
  try {
    var foundKategoria = await Kategoria.findById(req.params.kategoria);
    foundKategoria.kat = req.body.editKatKat;
    await foundKategoria.save();
    var renderUrl = '/arlistak/'+req.params.arlistaUrl+'/edit';
    res.redirect(renderUrl);
  } catch (err) {
    res.render("error", {error: err});
  }
});

// UPDATE termek
router.put("/arlistak/:arlistaUrl/:kategoria/:termek", async function(req, res){
  try {
    var foundKategoria = await Kategoria.findById(req.params.kategoria);
    var termekToUpdate = foundKategoria.termekek.id(req.params.termek);
    var newTermek = {
      nev: req.body.editNev,
      kiszereles: req.body.editKiszereles,
      ar: Number(req.body.editAr)
    };
    termekToUpdate.set(newTermek);
    await foundKategoria.save();
    var renderUrl = '/arlistak/'+req.params.arlistaUrl+'/edit';
    res.redirect(renderUrl);
  } catch (err) {
    res.render("error", {error: err});
  }
});

// DELETE arlista
router.delete("/arlistak/:arlistaUrl", async function(req, res){
  try {
    var foundArlista = await Arlista.findOne({ url: req.params.arlistaUrl});
    var foundKategoriak = await Kategoria.find({arlista: foundArlista._id});
    if (Array.isArray(foundKategoriak) && foundKategoriak.length > 0) {
      foundKategoriak.forEach(function(kategoria){
        Kategoria.findByIdAndRemove(kategoria._id, function(err){
          if (err) {
            res.render("error", {error: err});
          }
        });
      });
    }
    Arlista.findByIdAndRemove(foundArlista._id, function(err){
          if (err) {
            res.render("error", {error: err});
          }
        });
  } catch (err) {
    res.render("error", {error: err});
  }
  res.redirect("/arlistak");
});

// DELETE kategoria
router.delete("/arlistak/:arlistaUrl/:kategoria", function(req, res){
  Kategoria.findByIdAndRemove(req.params.kategoria, function(err){
    if (err) {
      res.render("error", {error: err});
    } else {
      var renderUrl = '/arlistak/'+req.params.arlistaUrl+'/edit';
      res.redirect(renderUrl);
    }
  });
});

// DELETE termek
router.delete("/arlistak/:arlistaUrl/:kategoria/:termek", async function(req, res){
  try {
    var foundKategoria = await Kategoria.
      findById(req.params.kategoria);
      foundKategoria.termekek.id(req.params.termek).remove();
      var saveKategoria = await foundKategoria.save();
      var renderUrl = '/arlistak/'+req.params.arlistaUrl+'/edit';
      res.redirect(renderUrl);
  } catch (err) {
    res.render("error", {error: err});
  }
});

// catch all - don't get lost
router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
