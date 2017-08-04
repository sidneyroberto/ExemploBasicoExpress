var express = require('express');
var router = express.Router();
var ctrlContatos = require('../controllers/contato');

router.get('/contatos', ctrlContatos.buscaContatos);
router.post('/contatos', ctrlContatos.salvaContato);
router.delete('/contatos/:id', ctrlContatos.removeContato);

module.exports = router;