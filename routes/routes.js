var express   = require('express'),
    router    = express.Router(),
    middleware = require('../middleware');

// GET home page
router.get('/', function(req, res) {
  res.redirect('/arlistak');
});

// catch all - don't get lost
router.get('*', function(req, res) {
  res.redirect('/');
});

module.exports = router;
