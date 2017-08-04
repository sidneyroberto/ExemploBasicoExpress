var Contato = require('../models/contato');

module.exports.salvaContato = function (req, res) {
    Contato.create(req.body.contato)
        .then(
        function (contato) {
            res.status(201).json(contato);
        },
        function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        }
        );
};

module.exports.buscaContatos = function (req, res) {
    Contato.find().sort({ 'nome': 1 }).exec()
        .then(
        function (contatos) {
            res.json(contatos);
        },
        function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        }
        );
};

module.exports.atualizaContato = function (req, res) {
    var id = req.body.id;
    var contato = req.body.contato;
    Contato.findByIdAndUpdate(id, contato).exec()
        .then(
        function (contato) {
            res.status(201).json(contato);
        },
        function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        }
        );
};

module.exports.removeContato = function (req, res) {
    var id = req.params.id;
    Contato.remove({ "_id": id }).exec()
        .then(
        function () {
            res.status(204).end();
        },
        function (erro) {
            return console.error(erro);
        }
        );
};