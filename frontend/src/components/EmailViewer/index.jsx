import './index.scss'
import { useState } from 'react';

export default function EmailViewer({ 
    email,
    aoArquivar,
    aoExcluir,
    aoRestaurar,
    aoMarcarComoNaoLido,
    aoAlternarImportante,
    emails,
    setEmails,
    pastaSelecionada }) {

    const [analisando, setAnalisando] = useState(false);

    async function analisarComIA() {

        setAnalisando(true);

        try {
            const resposta = await fetch("http://localhost:7070/analisar-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: email.id
                })
            });
    
            const dados = await resposta.json();
            
            setEmails(emailsAnteriores => {
                return emailsAnteriores.map(emailAtual => {
                    if (emailAtual.id === email.id) {
                        return {
                            ...emailAtual,
                            classificacao: dados.classificacao
                        }
                    } else {
                        return emailAtual
                    }
                })
            })
        } finally {
            setAnalisando(false);
        }

        
    }

    if (pastaSelecionada === "Assist AI") {
        return (
            <div className='comp-none'>

            </div>
        )
    }

    if (!email ) {
        return (
            <section className='comp-emailViewer'>
                <div id='nenhumEmail'>
                    <p>selecione um e-mail para visualizar</p>
                </div>
            </section>
        );
    }

    return (
        <section className='comp-emailViewer'>
            <div className='email'>
                <div className='email-header'>
                    <h2>{email.assunto}</h2>
                </div>
                <div className='email-remetente'>
                    <h3>{email.remetente}</h3>
                    <p>{email.data}</p>
                </div>
                <div className='email-content'>
                    <p>
                        {email.conteudo}
                    </p>
                </div>
            </div>
            <div className='actions'>
                {email.pasta === "Lixeira" ? (
                    <button
                        className='action-restore'
                        onClick={() => aoRestaurar(email.id, setEmails, emails)}>
                        Restaurar
                    </button>
                ) : (
                    <>
                        <button
                            className='action-primary'
                            onClick={() => aoArquivar(email.id, setEmails, emails)}>
                            Arquivar E-mail
                        </button>

                        <button
                            className='action-delete'
                            onClick={() => aoExcluir(email.id, setEmails, emails)}>
                            Excluir E-mail
                        </button>

                        <button onClick={() => aoMarcarComoNaoLido(email.id, setEmails, emails)}>
                            Marcar como não lido
                        </button>

                        <button
                            className='action-star'
                            onClick={() => aoAlternarImportante(email.id, setEmails, emails)}>
                            <i className={`${email.importante ? 'fa-solid fa-star' : 'fa-regular fa-star' }`} />
                        </button>

                        <button 
                            onClick={analisarComIA}
                            disabled={analisando}   
                        >
                            {analisando ? "Analisando..." : "Analisar com IA"}
                        </button>
                    </>
                )}
            </div>

            {email.classificacao && (
                <div className='ai-analysis'>
                    <div className='ai-analysis-header'>
                        <span className='ai-analysis-icon'><i className='fa-solid fa-wand-magic-sparkles' /></span>
                        <div>
                            <h3>Análise da IA</h3>
                            <p>Leitura automática deste e-mail</p>
                        </div>
                    </div>
                    <div className='ai-analysis-grid'>
                        <p><span>Categoria</span><strong>{email.classificacao.Categoria}</strong></p>
                        <p><span>Importância</span><strong>{email.classificacao["Importância"]}</strong></p>
                        <p><span>Urgência</span><strong>{email.classificacao["Urgência"]}</strong></p>
                        <p><span>Necessidade de ação</span><strong>{email.classificacao["Necessidade de ação"]}</strong></p>
                        <p><span>Prazo</span><strong>{email.classificacao.Prazo ?? "Nenhum"}</strong></p>
                    </div>
                </div>
            )}

        </section>
    );
}