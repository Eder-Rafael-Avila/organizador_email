import './index.scss'

import { useState } from 'react';

export default function AssistAiSection() {

    const [mensagensChat, setMensagensChat] = useState([]);
    const [msgUsuario, setMsgUsuario] = useState('');

    async function enviarMensagem(e) {
        e.preventDefault();
        
        setMensagensChat(mensagensAnteriores => [
            ...mensagensAnteriores,
            msgUsuario
        ]);

        const resposta = await fetch("http://localhost:7070/assist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mensagem: msgUsuario
            })
        });

        const dados = await resposta.json();
    
        setMensagensChat(mensagensAnteriores => [
            ...mensagensAnteriores,
            dados.resposta
        ])

    }

    return (
        <section className='comp-assistSection'>
            <h2>Seu assistente AI</h2>

            <div className='chat-area'>

                <div className='mensagens'>
                    <ul>
                        {
                            mensagensChat.map((msg, pos) => {
                                return (
                                    <li key={pos}>
                                        {msg}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className='text-bar'>
                    <form onSubmit={enviarMensagem}>
                        <input type="text"
                            placeholder='Quais são minhas tarefas da semana?'
                            value={msgUsuario}
                            onChange={e => setMsgUsuario(e.target.value)} />
                        <button>
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}