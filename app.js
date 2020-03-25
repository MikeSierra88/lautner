var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var indexRouter = require('./routes/routes');

var app = express();

// connect database using mongoose
const LAUTNERDB_URI = process.env.LAUTNERDB + '/test?retryWrites=true&w=majority';
var mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


mongoose.connect(LAUTNERDB_URI).
  catch(error => function(err){
     console.log(err.reason);
  });
  
var db = mongoose.connection;
db.once('open', function() {
  console.log('DB connected');
  // var kittySchema = new mongoose.Schema({
  //   name: String
  // }, {writeConcern: {w: 1}});
  
  // kittySchema.methods.speak = function () {
  //   var greeting = this.name
  //     ? "Meow name is " + this.name
  //     : "I don't have a name";
  //   console.log(greeting);
  // }
  
  // var Kitten = mongoose.model('Kitten', kittySchema);
  
  // var fluffy = new Kitten({ name: 'fluffy' });
  // fluffy.speak(); // "Meow name is fluffy"
  
  // fluffy.save(function (err, fluffy) {
  //   if (err) return console.error(err);
  //   fluffy.speak();
  // });
  
  // Kitten.find(function (err, kittens) {
  //   if (err) return console.error(err);
  //   console.log(kittens);
  // })
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  var error = err;
  res.render("error.ejs", {error: error});
});

module.exports = app;
