import './index.scss'

export default function EmailViewer({ 
    email,
    aoArquivar,
    aoExcluir,
    aoRestaurar,
    aoMarcarComoNaoLido,
    aoAlternarImportante,
    emails,
    setEmails }) {

    if (!email) {
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
                    </>
                )}

            </div>
        </section>
    );
}