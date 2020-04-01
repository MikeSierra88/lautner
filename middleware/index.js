// Middlewares
var { param, check, validationResult } = require('express-validator');

var middlewareObj = {};

    // Auth middleware to check if user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

    // reCAPTCHA middleware for login
middlewareObj.captchaPassed = function(req,res,next){
  if(req.body['g-recaptcha-response'] === undefined || 
      req.body['g-recaptcha-response'] === '' || 
      req.body['g-recaptcha-response'] === null)
  {
    return res.json({"responseError" : "something goes wrong"});
  }
  
  var secretKey = process.env.RECAPTCHA_SECRET_KEY;
  var verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'];
  fetch(verificationURL, {method: 'post'})
    .then(response => response.json())
    .then(google_response => {
      console.log(google_response);
      if (google_response.success) {
        next();
      } else {
        res.redirect("/login");
      }
    })
    .catch(error => res.json({ error }));
};

middlewareObj.userValidation = async function(req,res,next){
    await check('username').trim().escape().isLength({ min: 3}).run(req);
    await check('password').trim().escape().matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/, "g").run(req);
    
    var result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result);
      return res.status(422).json({ errors: result.array() });
    }
    next();
};

middlewareObj.urlValidation = async function(req,res,next){
    try{
      if (req.params.kategoria) {
        await param('kategoria').isMongoId().run(req);
      }
      if (req.params.kategoria) {
        await param('termek').isMongoId().run(req);
      }
      
      
      var result = validationResult(req);
      if (!result.isEmpty()) {
        console.log(result);
        return res.status(422).json({ errors: result.array() });
      }
      next();
    } catch (err) {
      console.log(err);
    }
    
};

middlewareObj.arlistaValidation = async function(req,res,next){
    try{
      await check('url').trim().matches(/^([A-z0-9\-\_]){3,30}$/, "g").run(req);
      await check('title').trim().escape().run(req);
      
      var result = validationResult(req);
      if (!result.isEmpty()) {
        console.log(result);
        return res.status(422).json({ errors: result.array() });
      }
      next();
    } catch (err) {
      console.log(err);
    }
    
};

middlewareObj.kategoriaValidation = async function(req,res,next){
    try {
      await check('kat').trim().escape().run(req);
      
      var result = validationResult(req);
      if (!result.isEmpty()) {
        console.log(result);
        return res.status(422).json({ errors: result.array() });
      }
      next();
    } catch (err) {
      console.log(err);
    }
};

middlewareObj.termekValidation = async function(req,res,next){
    try {
      await check('nev').trim().escape().run(req);
      await check('kiszereles').trim().escape().run(req);
      await check('ar').trim().escape().isInt().run(req);
      
      var result = validationResult(req);
      if (!result.isEmpty()) {
        console.log(result);
        return res.status(422).json({ errors: result.array() });
      }
      next();
    } catch (err) {
      console.log(err);
    }
};

module.exports = middlewareObj;