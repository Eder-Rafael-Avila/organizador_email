import { use } from 'react';
import './index.scss'
import { useState } from 'react';

export default function EmailViewer({ 
    email,
    aoArquivar,
    aoRemoverArquivado,
    aoExcluir,
    aoRestaurar,
    aoMarcarComoNaoLido,
    aoAlternarImportante,
    emails,
    setEmails,
    pastaSelecionada }) {

    const [analisando, setAnalisando] = useState(false);
    const [criandoLembrete, setCriandoLembrete] = useState(false);
    const [comentarioLembrete, setComentarioLembrete] = useState('');
    const [dataLembrete, setDataLembrete] = useState('');
    const [horaLembrete, setHoraLembrete] = useState('');

    async function analisarComIA() {

        setAnalisando(true);

        try {
            const resposta = await fetch("http://localhost:7070/analisar-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
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

    async function criarLembrete() {
        if (!dataLembrete || !horaLembrete || !comentarioLembrete.trim()) {
            return;
        }

        const resposta = await fetch('http://localhost:7070/lembretes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailId: email.id,
                comentario: comentarioLembrete,
                data: dataLembrete,
                hora: horaLembrete
            })
        });

        const dados = await resposta.json();

        console.log(dados);
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
                ) : email.pasta !== "Arquivados" ? (
                    <>
                        <button
                            className='action-primary'
                            onClick={() => {
                                aoArquivar(email.id, setEmails, emails)
                                if (email.importante === true) {
                                    aoAlternarImportante(email.id, setEmails, emails)
                                }
                            }}>
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
                        <button onClick={() => setCriandoLembrete(!criandoLembrete)}>
                            🔔 Lembrar-me
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => {
                            aoRemoverArquivado(email.id, setEmails, emails)
                        }}>
                            Desarquivar
                        </button>
                        <button
                            className='action-delete'
                            onClick={() => aoExcluir(email.id, setEmails, emails)}>
                            Excluir E-mail
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

            {criandoLembrete && (
                <div className="area-lembrete">
                    <h3>Lembrar deste e-mail</h3>

                    <label htmlFor="data">
                        Data
                        <input type="date"
                               name="data" 
                               id="data"
                               value={dataLembrete}
                               onChange={(e) => setDataLembrete(e.target.value)}
                        />
                    </label>

                    <label htmlFor="horario">
                        Horário
                        <input type="time" 
                               name="horario" 
                               id="horario"
                               value={horaLembrete}
                               onChange={(e) => setHoraLembrete(e.target.value)}
                        />
                    </label>

                    <label htmlFor="comentario">
                        Comentário
                        <textarea name="comentario"
                                  id="comentario"
                                  value={comentarioLembrete}
                                  onChange={(e) => setComentarioLembrete(e.target.value)}  
                                >
                        </textarea>
                    </label>

                    <button onClick={criarLembrete}>
                        Criar lembrete
                    </button>
                </div>
            )}

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