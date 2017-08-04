var express = require('express');
var router = express.Router();
var ctrlContatos = require('../controllers/contato');

/* GET home page. */
router.get('/', ctrlContatos.inicia);
router.post('/', ctrlContatos.salvaNovoContato);
router.get('/contato/:id', ctrlContatos.removeContato);

module.exports = router;
