var mongoose = require('mongoose');

var termo = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Contato', termo);