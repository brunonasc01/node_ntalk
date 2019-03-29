const KEY = 'ntalk.sid';
const SECRET = 'ntalk';

var express = require('express');
var path = require('path');
var consign = require('consign');
//var routes = require('./routes/index');
//var users = require('./routes/users');
var app = express()
//, load = require('express-load')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var methodOverride = require('method-override');
var error = require('./middlewares/error');
const socketIO = require('socket.io');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

cookie = cookieParser(SECRET);
store = new expressSession.MemoryStore();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookie);
app.use(expressSession({
  secret: SECRET,
  name: KEY,
  resave: true,
  saveUninitialized: true,
  store: store
}));
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

consign({})
  .include('sockets')
  .into(io)
;

io.use(function(socket, next){
  var data = socket.request;

  cookie(data, {}, function(err){
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function(err, session){
      if(err || !session){
        return next (new Error('acesso negado'));
      }
      else {
        socket.handshake.session = session;
        return next();
      }
    })
  });
});

app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, ()=> {
  console.log('Ntalk no ar');
})
