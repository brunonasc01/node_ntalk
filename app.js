var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/usuarios', users);

app.listen(3000, ()=> {
  console.log('Ntalk no ar');
})
