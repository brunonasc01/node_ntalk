const schema = require('mongoose').Schema;

module.exports = () => {
    const contato = schema({
        nome: String,
        email: String
    });

    const usuario = schema({
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: {unique: true}
        },
        contatos: [contato]
    });

    return db.model('usuarios', usuario);
};