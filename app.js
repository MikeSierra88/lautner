var path           = require('path'),
    logger         = require('morgan'),
    express        = require('express'),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    createError    = require('http-errors'),
    cookieParser   = require('cookie-parser'),
    indexRouter    = require('./routes/routes'),
    methodOverride = require('method-override');
    
var app = express();

// connect database using mongoose
const LAUTNERDB_URI = process.env.LAUTNERDB + '/test?retryWrites=true&w=majority';

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
    // Seed test data into database
    //require('./models/seedData');
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
app.use(methodOverride("_method"));

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
