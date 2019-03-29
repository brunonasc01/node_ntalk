var autenticar = require('../middlewares/autenticador');

module.exports = function(app){
    var chat = app.controllers.chat;
    app.get('/chat', autenticar, chat.index);
}