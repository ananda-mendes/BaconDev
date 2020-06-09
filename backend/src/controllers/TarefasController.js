const express = require ('express');
const Tarefa = require ('../models/tarefas');

module.exports = {
    async create (request, response) {
        const {nome} = request.body;
        try {
            await Tarefa.create ({
                nome,
            });
            return response.status(202).send({ok: 'Requisição bem sucedida'})
        } catch (err) {
            return response.status(400).send({error: 'Não foi possível cadastrar nova tarefa.'});
        }
    },

    async index (request, response) {
        try {
            const tarefas = await Tarefa.find();
            return response.json(tarefas);
        } catch (err) {
            return response.status(400).send({error: 'Erro ao carregar tarefas'})
        }
    },

    async destroy (request, response) {
        const idTarefa = request.params.id;
        try {
            await Tarefa.deleteOne({ _id: idTarefa });
            return response.status(200).send({ ok: 'Requisição bem sucedida' })
        } catch (err) {
            return response.status(400).send({ error: 'Não foi possivel deletar.'});
        }
    
    }
}