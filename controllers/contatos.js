const { Types: {ObjectId}} = require('mongoose');

module.exports = function(app){
    const Usuario = app.models.usuario;

    var ContatosController = {
        index: function(req, res){
            const { _id } = req.session.usuario;

            Usuario.findById(_id)
                .then ((usuario) => {
                    const { contatos } = usuario;
                    res.render('contatos/index', {contatos});        
                })
                .catch(() => res.redirect('/'));

            /*var usuario = req.session.usuario;
            var contatos = usuario.contatos;
            var params = {usuario: usuario, contatos: contatos};

            res.render('contatos/index', params);*/
        },
        create: function(req, res){
            const { contato } = req.body;
            const { _id } = req.session.usuario;
            const set = { $push: {contatos: contato}};

            Usuario.findByIdAndUpdate(_id, set)
                .then(() => res.redirect('/contatos'))
                .catch(() => res.redirect('/'));

            /*var contato = req.body.contato;
            var usuario = req.session.usuario;
            usuario.contatos.push(contato);

            res.redirect('/contatos');*/
        },
        show: function(req, res){
            const { _id } = req.session.usuario;
            const contatoId = req.params.id;
            Usuario.findById(_id)
                .then((usuario) => {
                    const {contatos} = usuario;
                    const contato = contatos.find((ct) => {
                        return ct._id.toString() === contatoId;
                    });
                    res.render('contatos/show', {contato});
                })
                .catch(() => res.redirect('/'));

            /*var id = req.params.id;
            var contato = req.session.usuario.contatos[id];
            var params = {contato: contato, id: id};

            res.render('contatos/show', params);*/
        },
        edit: function(req, res){
            const { _id } = req.session.usuario;
            const contatoId = req.params.id;
            Usuario.findById(_id)
                .then((usuario) => {
                    const {contatos} = usuario;
                    const contato = contatos.find((ct) => {
                        return ct._id.toString() === contatoId;
                    });
                    res.render('contatos/edit', { contato, usuario});
                })
                .catch(() => res.redirect('/'));

            /*var id = req.params.id;
            var usuario = req.session.usuario;
            var contato = usuario.contatos[id];
            var params = {usuario: usuario, contato: contato, id: id};

            res.render('contatos/edit', params);*/
        },
        update: function( req, res){
            const contatoId = req.params.id;
            const {contato} = req.body;
            const {usuario} = req.session;

            console.log( contatoId);

            const {where} = {_id: usuario._id, 'contatos._id': contatoId}
            //const {where} = { 'contatos._id': contatoId};
            const set = { $set: {'contatos.$': contato}};

            Usuario.update(where,set)
                .then(() => res.redirect('/contatos'))            
                .catch(e => res.status(400).send(e));

            /*Usuario.updateOne(where, set)
                .then(() => res.redirect('/contatos'))
                .catch(e => res.status(400).send(e));*/
        
            /*var contato = req.body.contato;
            var usuario = req.session.usuario;
            usuario.contatos[req.params.id] = contato;

            res.redirect('/contatos');*/
        },
        destroy: function(req, res){
            const contatoId = req.params.id;
            const { _id } = req.session.usuario;
            const where = { _id };
            const set = {
                $pull: {
                    contatos: { _id: ObjectId(contatoId)}
                }
            };

            Usuario.update(where, set)
                .then(() => res.redirect('/contatos'))
                .catch(() => res.redirect('/'));

            /*var usuario = req.session.usuario;
            var id = req.params.id;
            usuario.contatos.splice(id, 1);

            res.redirect('/contatos');*/
        }
        

    };
    return ContatosController;
};