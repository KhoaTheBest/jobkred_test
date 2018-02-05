const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var router = require('./app/configs/routes')(app);
var database = require('./app/helpers/dbHelper')(() => app.listen(port));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

module.exports = app;