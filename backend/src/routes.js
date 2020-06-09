const { Router } = require ('express');
const TarefaController = require ('./controllers/TarefasController');

const routes = Router();

routes.get ('/tarefas', TarefaController.index);
routes.post ('/tarefas', TarefaController.create);
routes.delete('/tarefas/:id', TarefaController.destroy);

module.exports = routes;