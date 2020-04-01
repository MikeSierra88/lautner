var express = require('express'),
    Arlista   = require('../models/arlista'),
    Kategoria = require('../models/kategoria'),
    Termek    = require('../models/termek'),
    middleware = require('../middleware');

var router = express.Router();

// ARLISTA ROUTES

    // GET arlistak aggregate
router.get('/', function(req, res) {
  Arlista.find({}, function(err, arlistak){
    if (err) {
      res.render("error", {error: err});
    } else {
      res.render("arlistak", {arlistak: arlistak});
    }
  });
});

    // GET arlista show page by url
router.get('/:arlistaUrl', 
  middleware.urlValidation,
  function(req, res) {
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
          res.redirect('/');
        }
      }
    });
});

    // POST new arlista
router.post('/', 
  middleware.isLoggedIn, 
  middleware.arlistaValidation, 
  async function (req, res) {
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
router.get('/:arlistaUrl/edit', 
  middleware.isLoggedIn, 
  function(req, res) {
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
          res.redirect('/');
        }
      }
    });
});

    // POST new termek, and new kategoria if needed
router.post('/:arlistaUrl/termek', 
  middleware.isLoggedIn, 
  middleware.termekValidation,
  middleware.kategoriaValidation,
  async function(req, res) {
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

    // UPDATE arlista
router.put("/:arlistaUrl", 
  middleware.isLoggedIn, 
  middleware.arlistaValidation,
  async function(req, res){
    try {
      var foundArlista = await Arlista.findOne({url: req.params.arlistaUrl});
      foundArlista.title = req.body.title;
      await foundArlista.save();
      var renderUrl = '/arlistak/'+req.params.arlistaUrl+'/edit';
      res.redirect(renderUrl); 
    } catch (err) {
      res.render("error", {error: err});
    }
});

    // UPDATE kategoria
router.put("/:arlistaUrl/:kategoria", 
  middleware.isLoggedIn, 
  middleware.urlValidation,
  middleware.kategoriaValidation,
  async function(req, res){
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
router.put("/:arlistaUrl/:kategoria/:termek", 
  middleware.isLoggedIn, 
  middleware.urlValidation,
  async function(req, res){
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
router.delete("/:arlistaUrl", 
  middleware.isLoggedIn,
  async function(req, res){
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
    res.redirect("/");
});

    // DELETE kategoria
router.delete("/:arlistaUrl/:kategoria", 
  middleware.isLoggedIn, 
  middleware.urlValidation,
  function(req, res){
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
router.delete("/:arlistaUrl/:kategoria/:termek", 
  middleware.isLoggedIn,
  middleware.urlValidation,
  async function(req, res){
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

module.exports = router;