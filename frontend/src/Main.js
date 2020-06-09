import React, {useState, useEffect} from 'react';
import './Main.css';

import api from './services/api';

export default function Main() {

    const [nome, setNome] = useState ('');
    const [tarefas, setTarefas] = useState ([]);

    async function cadastrarTarefa (e) {
        e.preventDefault();
        try {
            const response = await api.post('/tarefas', {
                nome 
            });
            
            setNome('');
            setTarefas([...tarefas, response.data]);
        } catch (error) {
            console.log (error);
        }
    }

    async function excluirTarefa (e, idTarefa) {
        e.preventDefault();
        await api.delete (`/tarefas/${idTarefa}`)
        .then((response) => {
            console.log('Tarefa excluída com sucesso.');
        }).catch((error) => {
            console.log(error);
        });
    }

    async function carregarTarefas () {
        const response = await api.get('/tarefas');

        setTarefas(response.data);
    }
    
    useEffect (() => {
        carregarTarefas();
    }, [cadastrarTarefa, excluirTarefa]);

    return (
        <div id="main">
            <div id="tarefa">
                <input 
                    type="text" 
                    placeholder="Escreva uma tarefa aqui..."
                    name="nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <button
                    className="btn-cadastro"
                    type="submit"
                    onClick= {e => {
                        cadastrarTarefa(e);
                    }}
                >Adicionar tarefa</button>
            </div>
        
            <div id="container">
                {tarefas.map(tarefas => (
                    <div className="item" key={tarefas._id}> 
                        <a>{tarefas.nome}</a>
                        <button
                            className="btn-deletar"
                            type="submit"
                            onClick={e => {
                                excluirTarefa(e, tarefas._id);
                            }}
                        >Excluir tarefa</button>
                    </div>
                ))}
               
            </div>
           
        </div>

    );

}

