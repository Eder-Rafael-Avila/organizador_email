import './index.scss'

import { useState } from 'react';

export default function AssistAiSection() {

    const [mensagensChat, setMensagensChat] = useState([]);
    const [msgUsuario, setMsgUsuario] = useState('');
    const [respondendo, setRespondendo] = useState(false);

    async function enviarMensagem(e) {
        e.preventDefault();

        const mensagem = msgUsuario.trim();

        if (!mensagem || respondendo) {
            return;
        }

        setRespondendo(true);
        setMsgUsuario('');

        try {
            const novoHistorico = [
                ...mensagensChat,
                {
                    papel: "Usuário",
                    mensagem
                }
            ]
    
            setMensagensChat(novoHistorico);
    
    
            const resposta = await fetch("http://localhost:7070/assist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mensagem,
                    historico: novoHistorico
                })
            });
    
            const dados = await resposta.json();
        
            setMensagensChat(mensagensAnteriores => [
                ...mensagensAnteriores,
                {
                    papel: "Assistente AI de e-mails",
                    mensagem: dados.resposta
                }
            ])
        } finally {
            setRespondendo(false)
        }
        

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
                                    <li className={msg.papel === 'Usuário' ? 'mensagem-usuario' : 'mensagem-assistente'} key={pos}>
                                        {msg.mensagem}
                                    </li>
                                )
                            })
                        }

                        {
                            respondendo && (
                                <li className='mensagem-assistente'>
                                    Assistente está pensando...
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div className='text-bar'>
                    <form onSubmit={enviarMensagem}>
                        <input
                            type="text"
                            placeholder='Quais são minhas tarefas da semana?'
                            value={msgUsuario}
                            onChange={e => setMsgUsuario(e.target.value)} />
                        <button
                            type='submit'
                            disabled={respondendo}
                        >   
                            {respondendo ? "Respondendo..." : "Enviar"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}