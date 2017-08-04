var request = require('request');

var opcoesApi = {
    servidor: "http://localhost:3000"
};

var renderizaPaginaInicial = function (req, res, contatos) {
    var mensagem;
    if (!(contatos instanceof Array)) {
        mensagem = "Erro ao tentar recuperar os contatos";
        resposta = [];
    } else if (!contatos.length) {
        mensagem = "Nenhum contato cadastrado";
    } else {
        mensagem = contatos.length + ' contatos cadastrados';
    }

    res.render('index', {
        titulo: 'Agenda',
        contatos: contatos,
        mensagem: mensagem
    });
};

var carregaPaginaInicial = function (req, res) {
    var caminho = '/api/contatos';
    var opcoesRequisicao = {
        url: opcoesApi.servidor + caminho,
        method: 'GET',
        json: {}
    };
    request(
        opcoesRequisicao,
        function (erro, resposta, contatos) {
            renderizaPaginaInicial(req, res, contatos);
        }
    );
};

module.exports.inicia = function (req, res) {
    carregaPaginaInicial(req, res);
};

module.exports.salvaNovoContato = function (req, res) {
    var caminho = '/api/contatos';
    var contato = req.body;
    var opcoesRequisicao = {
        url: opcoesApi.servidor + caminho,
        method: 'POST',
        json: {
            contato: contato
        }
    };
    request(
        opcoesRequisicao,
        function (erro, resposta, body) {
            var mensagem = 'Contato salvo com sucesso!', sucesso = true;
            console.log('Status: ' + resposta.statusCode);
            if (resposta.statusCode === 500 || erro) {
                mensagem = 'Ocorreu um erro ao tentar salvar o contato';
                sucesso = false;
            }
            res.redirect('/');
        }
    );
};

module.exports.removeContato = function (req, res) {
    var id = req.params.id;
    var caminho = '/api/contatos/' + id;
    var opcoesRequisicao = {
        url: opcoesApi.servidor + caminho,
        method: 'DELETE',
        json: {}
    };
    request(
        opcoesRequisicao,
        function (erro, resposta, body) {
            var mensagem = 'Contato removido com sucesso!', sucesso = true;
            console.log('Status: ' + resposta.statusCode);
            if (resposta.statusCode === 500 || erro) {
                mensagem = 'Ocorreu um erro ao tentar remover o contato';
                sucesso = false;
            }
            res.redirect('/');
        }
    );
};