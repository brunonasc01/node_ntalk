module.exports = (app) => {
    const Usuario = app.models.usuario;

    const HomeController  = {
        index: function(req, res){
            res.render('home/index');
        },
        login: function(req, res){
            const { usuario } = req.body;
            const {email, nome } = usuario;
            const where = { email, nome};
            const set = {
                $setOnInsert: { email, nome, contatos: [] }
            };
            const options = {
                upsert: true, runValidators: true, new: true
            };

            Usuario.findOneAndUpdate(where, set, options)
                .select('email nome')
                .then((usuario) => {
                    req.session.usuario = usuario;
                    res.redirect('/contatos');
                })
                .catch(() => res.redirect('/'));
        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect('/');
        }
    };
    return HomeController;
};