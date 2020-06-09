const mongoose = require ('mongoose');

const TarefaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 3,
    }
});

module.exports = mongoose.model('tarefas', TarefaSchema);