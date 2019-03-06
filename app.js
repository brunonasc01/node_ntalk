var express = require('express');
var path = require('path');
var consign = require('consign');
//var routes = require('./routes/index');
//var users = require('./routes/users');
var app = express()
  //, load = require('express-load')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , expressSession = require('express-session')
  , methodOverride = require('method-override')
  , app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser('ntalk'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/usuarios', users);

//a ordem de carregamento das pastas importa
consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app)
;

app.listen(3000, ()=> {
  console.log('Ntalk no ar');
})
