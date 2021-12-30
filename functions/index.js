const functions = require("firebase-functions");

const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require('./routes/routes');

app.use('/', indexRouter);

exports.app = functions.region('europe-west1').https.onRequest(app);
